import { Button, Text } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { hanna } from '@/shared/common/theme';

export default function Home() {
  const t = useTranslations('Home');
  const locale = useLocale();

  return (
    <main className='bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center justify-center px-5 sm:p-0 gap-15'>
      <Text
        style={{
          fontSize: locale === 'ko' ? '4rem' : '1.75rem',
          wordBreak: 'break-word',
          fontFamily: hanna.style.fontFamily,
        }}
      >
        {t('title')}
      </Text>
      <Link href='/lookbooks'>
        <Button variant='filled' color='blue.9' size='xl' radius='md'>
          {t('button')}
        </Button>
      </Link>
    </main>
  );
}
