import { Text } from '@mantine/core';
import { LoaderCircleIcon } from 'lucide-react';

export default function Loader() {
  return (
    <div className=' bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center justify-center gap-2'>
      <LoaderCircleIcon className='animate-spin' />
      <Text size='xl' c='gray'>
        데이터를 불러오는 중 입니다.
      </Text>
    </div>
  );
}
