'use client';

import { useEffect, useState } from 'react';
import { Group, Radio, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useDetectWebView } from '@/hooks/useDetectWebView';
import { THEME } from '@/shared/common/constants';
import { MESSAGE_TYPE } from '@/shared/webview/constants';

export default function ThemePage() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Setting');
  const { theme, setTheme } = useTheme();
  const { isWebView } = useDetectWebView();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = (theme: string) => {
    if (isWebView) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: MESSAGE_TYPE.theme,
          data: theme,
        })
      );
    }
    setTheme(theme);
  };

  return (
    <div className='bg-white dark:bg-black w-full flex flex-col'>
      <Radio.Group value={theme || 'system'} onChange={handleThemeChange}>
        <div>
          {THEME.map((themeOption) => (
            <Radio.Card
              key={themeOption}
              value={themeOption}
              withBorder={false}
            >
              <Group className='pb-8' justify='space-between' wrap='nowrap'>
                <Text size='lg' fw={700}>
                  {t(themeOption)}
                </Text>
                <Radio.Indicator />
              </Group>
            </Radio.Card>
          ))}
        </div>
      </Radio.Group>
    </div>
  );
}
