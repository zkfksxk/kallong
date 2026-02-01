import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useDetectWebView } from '@/hooks/useDetectWebView';
import { Link } from '@/i18n/navigation';

export default function AppInfoPage() {
  const t = useTranslations('Setting');
  const { isWebView } = useDetectWebView();

  return (
    <div className='bg-white dark:bg-black w-full flex flex-1 flex-col'>
      <Text size='md'>
        <span className='font-bold'>칼롱</span>을 방문해주셔서 감사합니다!
      </Text>
      <Text size='md'>프로젝트가 재미있었다면 주변에 많이 홍보해주세요.☺</Text>
      <div className='mt-4 p-4 bg-gray-50 dark:bg-gray-300 rounded-lg'>
        <Text size='sm' c='gray.7' className='font-bold mb-2'>
          주의사항
        </Text>
        <Text c='gray.7' size='sm'>
          • 로그인하지 않은 사용자가 저장한 룩북은 수정이나 검색이 불가능해요.
          <span className='font-semibold'> 꼭 URL을 메모해주세요!</span>
        </Text>
        <Text c='gray.7' size='sm'>
          • 로그인하지 않은 사용자의 데이터는 주기적으로 삭제되니 투표 결과는
          미리 저장하세요.
        </Text>
        <Text c='gray.7' size='sm'>
          • 피드백을 적극 환영해요. 최대한 반영하겠습니다.
        </Text>
      </div>
      {!isWebView && (
        <div className='flex flex-col mt-10 gap-5'>
          <Link href='https://naver.me/xE6S9jbW'>
            <Text size='sm'>{t('formbutton')} ➡️</Text>
          </Link>
          <a
            href='https://buymeacoffee.com/karanta'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-[#e62d2d] text-white w-[180px] text-center px-4 py-2 rounded-md'
          >
            ☕ Buy me a coffee
          </a>
        </div>
      )}
    </div>
  );
}
