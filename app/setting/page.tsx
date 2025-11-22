import Link from 'next/link';
import { Button, Text } from '@mantine/core';

export default function SettingPage() {
  return (
    <main className='relative bg-white max-w-[500px] w-full flex flex-1 flex-col px-10 pb-20 '>
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
          • 누끼 사진은 저장되지 않아요. 무료 모델 기반이라 간단한 이미지 처리에
          적합합니다.
        </Text>
      </div>
      <div className='flex flex-col mt-10 gap-1'>
        <Link href='/' className='mt-5'>
          <Button variant='subtle' color='blue.9' size='md' radius='md' p='0'>
            홈으로 이동하기 ➡️
          </Button>
        </Link>
        <Link href='https://naver.me/xE6S9jbW' className='mt-5'>
          <Button variant='subtle' color='blue.9' size='md' radius='md' p='0'>
            의견 제안하기 ➡️
          </Button>
        </Link>
      </div>
    </main>
  );
}
