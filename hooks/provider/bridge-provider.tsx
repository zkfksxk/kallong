'use client';

import { ReactNode, createContext, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useDetectWebView } from '../useDetectWebView';

type AppSettings = {
  theme: 'light' | 'dark' | 'system';
  lang: 'ko' | 'en';
};

type WebToNativeMessage =
  | { id?: string; type: 'app/ready' }
  | { id?: string; type: 'settings/update'; payload: Partial<AppSettings> }
  | {
      id?: string;
      type: 'image/share';
      payload: { dataUrl: string; filename: string };
    };

type NativeToWebMessage =
  | {
      id?: string;
      type: 'app/ready';
      success: true;
      data: {
        settings: AppSettings;
        platform: 'ios' | 'android';
        appVersion: string;
      };
    }
  | {
      id?: string;
      type: 'settings/update';
      success: true;
      data: { settings: AppSettings };
    }
  | {
      id?: string;
      type: string;
      success: false;
      error: { code: string; message?: string };
    };

export type BridgeContextType = {
  updateNativeSettings: (patch: Partial<AppSettings>) => void;
  shareImage: (payload: { dataUrl: string; filename: string }) => void;
};

export const BridgeContext = createContext<BridgeContextType | null>(null);

export function BridgeProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { setTheme } = useTheme();
  const { canUseBridge } = useDetectWebView();
  const requestedReadyRef = useRef(false);

  const sendToNative = (message: WebToNativeMessage) => {
    if (!canUseBridge) return;
    window.ReactNativeWebView?.postMessage(JSON.stringify(message));
  };

  const applySettings = (settings: AppSettings) => {
    localStorage.setItem('theme', settings.theme);
    localStorage.setItem('lang', settings.lang);
    document.cookie = `lang=${settings.lang}; path=/; max-age=31536000; SameSite=Lax`;

    setTheme(settings.theme);

    if (settings.lang !== locale) {
      router.replace(pathname, { locale: settings.lang });
    }
  };

  const updateNativeSettings = (patch: Partial<AppSettings>) => {
    if (!canUseBridge) return;

    sendToNative({
      id: crypto.randomUUID(),
      type: 'settings/update',
      payload: patch,
    });
  };

  const shareImage = (payload: { dataUrl: string; filename: string }) => {
    if (!canUseBridge) return;

    sendToNative({
      id: crypto.randomUUID(),
      type: 'image/share',
      payload,
    });
  };

  useEffect(() => {
    if (!canUseBridge) return;

    const handleBridgeMessage = (event: Event) => {
      const message = (event as CustomEvent<NativeToWebMessage>).detail;

      if (!message.success) {
        console.error('Bridge error:', message.error);
        return;
      }

      if (message.type === 'app/ready') {
        applySettings(message.data.settings);
        return;
      }

      if (message.type === 'settings/update') {
        return;
      }
    };

    window.addEventListener('bridge-message', handleBridgeMessage);

    if (!requestedReadyRef.current) {
      requestedReadyRef.current = true;

      sendToNative({
        id: crypto.randomUUID(),
        type: 'app/ready',
      });
    }

    return () => {
      window.removeEventListener('bridge-message', handleBridgeMessage);
    };
  }, [canUseBridge, locale, pathname]);

  return (
    <BridgeContext.Provider
      value={{
        updateNativeSettings,
        shareImage,
      }}
    >
      {children}
    </BridgeContext.Provider>
  );
}
