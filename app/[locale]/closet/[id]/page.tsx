'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button, Text } from '@mantine/core';
import { useGetDailyOutfit } from '@/apis/querys/outfit/useGetDailyOutfit';
import { ClosetHeader } from '@/components/layouts/closet-header';
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

  const handleBack = () => {
    router.back();
  };

  return (
    <div className='relative bg-white flex flex-1 flex-col'>
      <ClosetHeader
        leftComponent={
          <button onClick={handleBack}>
            <Back color='black' size={24} />
          </button>
        }
        rightComponent={
          <Button
            onClick={() => router.push(`/closet/${id}/edit`)}
            variant='transparent'
            color='red.5'
            size='md'
            radius='md'
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
      <Text>{data.name}</Text>
      <Text>{data.description}</Text>
    </div>
  );
}
