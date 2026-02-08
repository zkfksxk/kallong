'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Text } from '@mantine/core';
import { useLocale } from 'next-intl';
import { useDetectWebView } from '@/hooks/useDetectWebView';
import { useRouter } from '@/i18n/navigation';

export default function DeeplinkPage() {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const { isWebView } = useDetectWebView();
  const to = searchParams.get('to') ?? '/';

  useEffect(() => {
    if (!isWebView) {
      router.replace('/', { locale });
      return;
    }

    const deeplink = `kallong://${to}`;
    window.location.href = deeplink;

    const timer = setTimeout(() => {
      router.replace('/', { locale });
    }, 1500);

    return () => clearTimeout(timer);
  }, [isWebView, router, locale, to]);

  return (
    <Box
      bg='red.1'
      className='w-full flex flex-col items-center gap-3 p-5 rounded-sm'
    >
      <Text ta='center' c='black' fw={700}>
        회원가입에 성공했습니다. 이동 중...
      </Text>
    </Box>
  );
}
