'use client';

import { useEffect, useState } from 'react';
import { Group, Radio, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useBridge } from '@/hooks/useBridge';
import { THEME } from '@/shared/common/constants';

export default function ThemePage() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Setting');
  const { theme, setTheme } = useTheme();
  const { updateNativeSettings } = useBridge();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    updateNativeSettings({
      theme: theme as 'light' | 'dark' | 'system',
    });
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
