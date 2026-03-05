import { Text } from '@mantine/core';
import { TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Fallback() {
  const t = useTranslations('Common');

  return (
    <div className=' bg-white dark:bg-black max-w-125 w-full mx-auto flex flex-1 flex-col items-center justify-center gap-2 pb-15'>
      <TriangleAlert className='h-6 w-6' />
      <Text size='xl' c='gray'>
        {t('errorOccurred')}
      </Text>
      <Link href='/'>{t('goHome')}</Link>
    </div>
  );
}
