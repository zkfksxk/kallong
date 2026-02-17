import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useDetectWebView } from '@/hooks/useDetectWebView';

export default function AppInfoPage() {
  const t = useTranslations('Setting.appinfo');
  const { isWebView } = useDetectWebView();

  return (
    <div className='bg-white dark:bg-black w-full flex flex-1 flex-col'>
      <Text size='md'>
        {t.rich('introduce', {
          bold: (chunks) => <span className='font-bold'>{chunks}</span>,
        })}
      </Text>
      <Text size='md'>{t('share')}</Text>
      <div className='mt-4 p-4 bg-gray-50 dark:bg-gray-300 rounded-lg'>
        <Text size='sm' c='gray.7' className='font-bold mb-2'>
          {t('notice.title')}
        </Text>
        <Text c='gray.7' size='sm'>
          {t.rich('notice.anonymousEdit', {
            bold: (chunks) => <span className='font-semibold'>{chunks}</span>,
          })}
        </Text>
        <Text c='gray.7' size='sm'>
          {t('notice.anonymousDelete')}
        </Text>
        <Text c='gray.7' size='sm'>
          {t('notice.feedback')}
        </Text>
      </div>
      {!isWebView && (
        <div className='flex flex-col mt-10 gap-5'>
          {/* <Link href='https://naver.me/xE6S9jbW'>
            <Text size='sm'>{t('formbutton')} ➡️</Text>
          </Link> */}
          <Text
            size='md'
            component='a'
            href='mailto:karanta.d2v@gmail.com'
            className='cursor-pointer hover:underline'
          >
            {t('formbutton')}
          </Text>
          <a
            href='https://buymeacoffee.com/karanta'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-[#e62d2d] text-white w-45 text-center px-4 py-2 rounded-md'
          >
            ☕ Buy me a coffee
          </a>
        </div>
      )}
    </div>
  );
}
