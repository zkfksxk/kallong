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
        프로젝트가 재미있었다면 주변에 많이많이 홍보해주세요.☺
      </Text>
      <Link href='/' className='mt-5'>
        <Button variant='subtle' color='blue.9' size='md' radius='md' p='0'>
          홈으로 이동하기 ➡️
        </Button>
      </Link>
    </main>
  );
}
