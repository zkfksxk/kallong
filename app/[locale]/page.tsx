import { Button, Text } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';
import { Header } from '@/components/layouts/header';
import { Link } from '@/i18n/navigation';
import { hanna } from '@/shared/theme/theme';

export default function Home() {
  const t = useTranslations('Home');
  const locale = useLocale();

  return (
    <main className='relative bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center px-5'>
      <Header className='absolute top-0 left-0 right-0 px-5' />
      <section className='flex flex-col flex-1 items-center justify-center gap-10'>
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
        <Link href='/lookbooks'>
          <Button variant='filled' color='red.5' size='xl' radius='md'>
            {t('button')}
          </Button>
        </Link>
      </section>
    </main>
  );
}
