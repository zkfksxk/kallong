import { Button, Text } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';
import { Header } from '@/components/layouts/header';
import { Link } from '@/i18n/navigation';
import { hanna } from '@/shared/theme/theme';

export default function Home() {
  const t = useTranslations('Home');
  const locale = useLocale();

  return (
    <main className='bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center px-5 pb-[60px]'>
      <Header />
      <section className='w-full flex flex-col flex-1 items-center justify-center gap-10'>
        <Text
          style={{
            fontSize: locale === 'ko' ? '3.5rem' : '1.75rem',
            wordBreak: 'break-word',
            fontFamily: hanna.style.fontFamily,
            justifySelf: 'center',
          }}
        >
          {t('title')}
        </Text>
        <Link href='/lookbooks' className='w-full px-15'>
          <Button
            variant='filled'
            color='red.5'
            size='lg'
            fullWidth
            radius='md'
          >
            {t('button')}
          </Button>
        </Link>
      </section>
    </main>
  );
}
