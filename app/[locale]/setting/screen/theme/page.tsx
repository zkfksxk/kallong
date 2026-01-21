'use client';

import { useEffect, useState } from 'react';
import { Group, Radio, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { THEME } from '@/shared/common/constants';

export default function ThemePage() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Setting');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  return (
    <div className='bg-white w-full flex flex-col'>
      <Radio.Group value={theme || 'system'} onChange={handleThemeChange}>
        <div>
          {THEME.map((themeOption) => (
            <Radio.Card
              key={themeOption}
              value={themeOption}
              withBorder={false}
            >
              <Group className='pb-8' justify='space-between' wrap='nowrap'>
                <Text size='lg' fw={700} c='black'>
                  {t(themeOption)}
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
