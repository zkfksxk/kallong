'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ActionIcon, Button, Text } from '@mantine/core';
import { useGetDailyOutfit } from '@/apis/querys/outfit/useGetDailyOutfit';
import { useRouter } from '@/i18n/navigation';
import { ICONS } from '@/shared/common/icons';

export default function DetailPage() {
  const { id } = useParams<{
    id: string;
  }>();
  const router = useRouter();
  const { data } = useGetDailyOutfit(id);
  const { Back } = ICONS;

  if (!data) return;

  return (
    <div className='relative bg-white flex flex-1 flex-col'>
      <header
        className='
        w-full 
        max-w-[500px] 
        h-18
        flex 
        items-center 
       justify-between
        mx-auto
        bg-white
        gap-3
        z-50
        '
      >
        <ActionIcon
          variant='transparent'
          size='xl'
          radius='md'
          title='추가'
          onClick={() => router.back()}
        >
          <Back color='black' size={24} />
        </ActionIcon>
        <Button
          variant='transparant'
          onClick={() => router.push(`/closet/${id}/edit`)}
        >
          수정
        </Button>
      </header>
      <div className='relative w-full max-w-125 aspect-square flex items-center justify-center border border-gray-300 rounded-md overflow-hidden'>
        {data?.image_url && (
          <Image src={data?.image_url} alt='daily-outfit' fill />
        )}
      </div>
      <Text>{data.name}</Text>
      <Text>{data.description}</Text>
    </div>
  );
}
