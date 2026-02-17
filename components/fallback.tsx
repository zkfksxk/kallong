import { Text } from '@mantine/core';
import { TriangleAlert } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function Fallback() {
  return (
    <div className=' bg-white max-w-125 w-full mx-auto flex flex-1 flex-col items-center justify-center gap-2'>
      <TriangleAlert className='h-6 w-6' />
      <Text size='xl' c='gray'>
        오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </Text>
      <Link href='/'>홈으로</Link>
    </div>
  );
}
