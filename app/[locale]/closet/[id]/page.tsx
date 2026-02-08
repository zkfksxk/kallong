'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button, Text } from '@mantine/core';
import { useGetDailyOutfit } from '@/apis/querys/outfit/useGetDailyOutfit';
import { Header } from '@/components/layouts/header';
import { useRouter } from '@/i18n/navigation';

export default function DetailPage() {
  const { id } = useParams<{
    id: string;
  }>();
  const router = useRouter();
  const { data } = useGetDailyOutfit(id);

  if (!data) return;

  return (
    <div className='relative bg-white dark:bg-black flex flex-1 flex-col'>
      <Header
        isBackbutton
        rightComponent={
          <Button
            onClick={() => router.push(`/closet/${id}/edit`)}
            variant='transparent'
            color='red.5'
            size='md'
            radius='md'
            p={0}
          >
            수정
          </Button>
        }
      />

      <div className='relative w-full max-w-125 aspect-square flex items-center justify-center border border-gray-300 rounded-md overflow-hidden'>
        {data?.image_url && (
          <Image src={data?.image_url} alt='daily-outfit' fill />
        )}
      </div>
      <div className='bg-gray-200 dark:bg-gray-700 mt-10 p-4 rounded-md'>
        <Text>{data.name}</Text>
      </div>
      <div className='bg-gray-200 dark:bg-gray-700 min-h-50 mt-10 p-4 rounded-md'>
        <Text>{data.description}</Text>
      </div>
    </div>
  );
}
