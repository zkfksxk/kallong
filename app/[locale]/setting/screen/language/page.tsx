'use client';

import { Group, Radio, Text } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';
import { useBridge } from '@/hooks/useBridge';
import { useRouter } from '@/i18n/navigation';
import { LANGUAGES } from '@/shared/common/constants/common';

export default function LanguagePage() {
  const t = useTranslations('Setting');
  const locale = useLocale();
  const router = useRouter();
  const { updateNativeSettings } = useBridge();

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale === locale) return;

    localStorage.setItem('lang', nextLocale);
    document.cookie = `lang=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    updateNativeSettings({
      lang: nextLocale as 'ko' | 'en',
    });

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
