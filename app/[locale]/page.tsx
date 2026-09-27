'use client';

import { Text, useMantineTheme } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';
import { Button, Header } from '@/components';
import { Link } from '@/i18n/navigation';
import { hanna } from '@/shared/theme/theme';

export default function Home() {
  const theme = useMantineTheme();
  const t = useTranslations('Home');
  const locale = useLocale();

  return (
    <main className='bg-white dark:bg-black max-w-125 w-full mx-auto flex flex-1 flex-col items-center px-5 pb-15'>
      <Header isSettingShow />
      <section className='w-full flex flex-col pt-5 bg-[#ffc9c8] rounded-lg mb-10'>
        <div className='flex flex-col gap-2 mx-5 mb-5'>
          <Text
            style={{
              fontSize: locale === 'ko' ? '3.5rem' : '1.75rem',
              wordBreak: 'break-word',
              fontFamily: hanna.style.fontFamily,
              justifySelf: 'center',
              color: theme.black,
            }}
          >
            {t('closet.title')}
          </Text>
          <Text size='md' fw={500} c={theme.black}>
            {t('closet.description')}
          </Text>
        </div>

        <Link href='/closet' className='w-full'>
          <Button fullWidth variant='filled'>
            {t('startButton')}
          </Button>
        </Link>
      </section>
      <section className='w-full flex flex-col pt-5 bg-[#ffc9c8] rounded-lg'>
        <div className='flex flex-col gap-2 mx-5 mb-5'>
          <Text
            style={{
              fontSize: locale === 'ko' ? '3.5rem' : '1.75rem',
              wordBreak: 'break-word',
              fontFamily: hanna.style.fontFamily,
              justifySelf: 'center',
              color: theme.black,
            }}
          >
            {t('lookbook.title')}
          </Text>
          <Text size='md' fw={500} c={theme.black}>
            {t('closet.description')}
          </Text>
        </div>
        <Link href='/lookbooks' className='w-full'>
          <Button fullWidth variant='filled'>
            {t('startButton')}
          </Button>
        </Link>
      </section>
    </main>
  );
}
