import Link from 'next/link';
import { Button, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('Tab');

  return (
    <main className='relative bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center justify-center'>
      <Stack align='center' justify='center' gap='md'>
        <Text>Not Found</Text>
        <Text>{t('notFound')}</Text>
        <Button component={Link} href='/' size='md' px='xl'>
          {t('goHome')}
        </Button>
      </Stack>
    </main>
  );
}
