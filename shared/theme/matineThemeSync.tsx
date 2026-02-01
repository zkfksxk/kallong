'use client';

import { useEffect } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import { useTheme } from 'next-themes';

export function MatineThemeSync() {
  const { setColorScheme } = useMantineColorScheme();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme === 'dark' || resolvedTheme === 'light') {
      setColorScheme(resolvedTheme);
    }
  }, [resolvedTheme, setColorScheme]);

  return null;
}
