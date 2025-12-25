import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function AppInfoPage() {
  const t = useTranslations('Setting');

  return (
    <div className='bg-white w-full flex flex-1 flex-col'>
      <Text c='black' size='md'>
        <span className='font-bold'>내일 뭐 입지?</span>를 방문해주셔서
        감사합니다!
      </Text>
      <Text c='black' size='md'>
        룩북을 올리면 12시간 동안 투표할 수 있습니다!
      </Text>
      <Text c='black' size='md'>
        프로젝트가 재미있었다면 주변에 많이 홍보해주세요.☺
      </Text>
      <div className='mt-4 p-4 bg-gray-50 rounded-lg'>
        <Text c='black' size='sm' className='font-bold mb-2'>
          주의사항
        </Text>
        <Text c='gray.7' size='sm'>
          • 현재 회원가입/로그인 기능이 없어 저장한 룩북은 수정이나 검색이
          불가능해요.
          <span className='font-semibold'> 꼭 URL을 메모해주세요!</span>
        </Text>
        <Text c='gray.7' size='sm'>
          • 데이터는 주기적으로 삭제되니 투표 결과는 미리 저장하세요!
        </Text>
        <Text c='gray.7' size='sm'>
          • 피드백이 적극 환영합니다. 폼에 남겨주시거나 커피 기부 시 메시지를
          남겨주세요. 최대한 반영하겠습니다!
        </Text>
      </div>
      <div className='flex flex-col mt-10 gap-5'>
        <Link href='https://naver.me/xE6S9jbW'>
          <Text c='black' size='sm'>
            {t('formbutton')} ➡️
          </Text>
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
    </div>
  );
}
