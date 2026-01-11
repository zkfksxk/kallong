'use client';

import { Group, Radio, Text } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { LANGUAGES } from '@/shared/common/constants';

export default function LanguagePage() {
  const t = useTranslations('Setting');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (nextLocale: string) => {
    // 예: /ko/setting -> /en/setting
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className='bg-white w-full flex flex-col'>
      <Radio.Group value={locale} onChange={handleLanguageChange}>
        <div>
          {LANGUAGES.map((lang) => (
            <Radio.Card key={lang.value} value={lang.value} withBorder={false}>
              <Group className='pb-8' justify='space-between' wrap='nowrap'>
                <Text size='lg' fw={700} c='black'>
                  {t(lang.label)}
                </Text>
                <Radio.Indicator color='black' />
              </Group>
            </Radio.Card>
          ))}
        </div>
      </Radio.Group>
    </div>
  );
}
