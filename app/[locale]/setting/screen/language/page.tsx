'use client';

import { Group, Radio, Text } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';
import { useDetectWebView } from '@/hooks/useDetectWebView';
import { useRouter } from '@/i18n/navigation';
import { LANGUAGES } from '@/shared/common/constants';
import { MESSAGE_TYPE } from '@/shared/webview/constants';

export default function LanguagePage() {
  const t = useTranslations('Setting');
  const locale = useLocale();
  const router = useRouter();
  const { isWebView } = useDetectWebView();

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale === locale) return;
    document.cookie = `lang=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    if (isWebView) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: MESSAGE_TYPE.lang,
          data: nextLocale,
        })
      );
    }

    // 예: /ko/setting -> /en/setting
    router.replace('/setting', { locale: nextLocale });
  };

  return (
    <div className='bg-white dark:bg-black w-full flex flex-col'>
      <Radio.Group value={locale} onChange={handleLanguageChange}>
        <div>
          {LANGUAGES.map((lang) => (
            <Radio.Card key={lang.value} value={lang.value} withBorder={false}>
              <Group className='pb-8' justify='space-between' wrap='nowrap'>
                <Text size='lg' fw={700}>
                  {t(lang.label)}
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
