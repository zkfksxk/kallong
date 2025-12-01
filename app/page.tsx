import Link from 'next/link';
import { Button, Text } from '@mantine/core';
import { hanna } from '@/shared/common/theme';

export default function Home() {
  return (
    <main className='bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center justify-center px-20 gap-15'>
      <Text
        style={{
          fontSize: '4rem',
          whiteSpace: 'nowrap',
          fontFamily: hanna.style.fontFamily,
        }}
      >
        내일 뭐 입지?
      </Text>
      <Link href='/lookbooks'>
        <Button variant='filled' color='blue.9' size='xl' radius='md'>
          시작하기
        </Button>
      </Link>
    </main>
  );
}
