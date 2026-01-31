'use client';

import { Button, Text } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';
import { SettingHeader } from '@/components/layouts/setting-header';
import { Link } from '@/i18n/navigation';
import { hanna } from '@/shared/theme/theme';

export default function Home() {
  const t = useTranslations('Home');
  const locale = useLocale();

  return (
    <main className='bg-white max-w-125 w-full mx-auto flex flex-1 flex-col items-center px-5 pb-15'>
      <SettingHeader />
      <section className='w-full flex flex-col pt-5 bg-[#ffc9c8] rounded-md mb-10'>
        <div className='flex flex-col gap-2 mx-5 mb-5'>
          <Text
            style={{
              fontSize: locale === 'ko' ? '3.5rem' : '1.75rem',
              wordBreak: 'break-word',
              fontFamily: hanna.style.fontFamily,
              justifySelf: 'center',
            }}
          >
            {t('title1')}
          </Text>
          <Text size='md'> {t('description1')}</Text>
        </div>

        <Link href='/closet' className='w-full'>
          <Button
            variant='filled'
            fullWidth
            color='red.5'
            size='md'
            radius='md'
          >
            {t('button')}
          </Button>
        </Link>
      </section>
      <section className='w-full flex flex-col pt-5 bg-[#ffc9c8] rounded-md'>
        <div className='flex flex-col gap-2 mx-5 mb-5'>
          <Text
            style={{
              fontSize: locale === 'ko' ? '3.5rem' : '1.75rem',
              wordBreak: 'break-word',
              fontFamily: hanna.style.fontFamily,
              justifySelf: 'center',
            }}
          >
            {t('title2')}
          </Text>
          <Text size='md'> {t('description2')}</Text>
        </div>
        <Link href='/lookbooks' className='w-full'>
          <Button
            variant='filled'
            fullWidth
            color='red.5'
            size='md'
            radius='md'
          >
            {t('button')}
          </Button>
        </Link>
      </section>
      {/* <CustomModal
        opened={opened}
        onClose={close}
        title={'개발 중...'}
        onSubmit={close}
      /> */}
    </main>
  );
}
