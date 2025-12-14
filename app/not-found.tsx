import Link from 'next/link';
import { Button, Stack, Text } from '@mantine/core';

export default function NotFound() {
  return (
    <main className='relative bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center justify-center'>
      <Stack align='center' justify='center' gap='md'>
        <Text>Not Found</Text>
        <Text>찾을 수 없는 페이지입니다.</Text>
        <Button component={Link} href='/' size='md' px='xl'>
          홈으로
        </Button>
      </Stack>
    </main>
  );
}
