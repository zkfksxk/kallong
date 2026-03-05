import { Text } from '@mantine/core';
import { LoaderCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Loader() {
  const t = useTranslations('Common');

  return (
    <div className=' bg-white dark:bg-black max-w-125 w-full mx-auto flex flex-1 flex-col items-center justify-center gap-2 pb-15'>
      <LoaderCircleIcon className='animate-spin' />
      <Text size='xl' c='gray'>
        {t('loadingData')}
      </Text>
    </div>
  );
}
