'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ActionIcon, Button, Tabs, Text } from '@mantine/core';
import { IoChevronBackOutline as Back } from 'react-icons/io5';
import { LookbookRes } from '@/apis/actions/lookbook';
import { useCreateLookbook } from '@/apis/querys/useCreateLookbook';
import { CreateImage } from '@/components/lookbooks/create/create-image';
import { LookbookForm } from '@/components/lookbooks/create/lookbook-form';
import { useLookbookStore } from '@/hooks/lookbook-provider';

export default function CreateLookbooksPage() {
  const [activeTab, setActiveTab] = useState<string | null>('first');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { firstLookbook, secondLookbook } = useLookbookStore((s) => s);
  const { mutateAsync, isPending } = useCreateLookbook();

  const isReadyToSubmit =
    firstLookbook.data.finalUrl && secondLookbook.data.finalUrl;

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    //2개의 Lookbook생성후 id 받음.
    try {
      const firstData = (await mutateAsync({
        lookbookData: firstLookbook,
        file: firstLookbook.data.finalFile!,
      })) as LookbookRes;

      const secondData = (await mutateAsync({
        lookbookData: secondLookbook,
        file: secondLookbook.data.finalFile!,
      })) as LookbookRes;

      //result 페이지로 리디렉션
      router.push(`/lookbooks/result/${firstData.id}/${secondData.id}`);
    } catch (error) {
      console.error('룩북 생성 중 오류 발생:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className='relative bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center px-10 pb-5 justify-between'>
      <Tabs color='black' value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value='first'>{firstLookbook.name || '첫번째 룩'}</Tabs.Tab>
          <Tabs.Tab value='second'>
            {secondLookbook.name || '두번째 룩'}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='first' pt='md'>
          <CreateImage lookbook={firstLookbook} />
          <LookbookForm targetLookbook='first' />
        </Tabs.Panel>
        <Tabs.Panel value='second' pt='md'>
          <CreateImage lookbook={secondLookbook} />
          <LookbookForm targetLookbook='second' />
        </Tabs.Panel>
      </Tabs>
      <div className='w-full flex flex-col gap-[50px] mt-[50px]'>
        <Button
          variant='filled'
          color='blue.9'
          size='xl'
          radius='md'
          onClick={handleSubmit}
          disabled={!isReadyToSubmit || submitting || isPending}
        >
          저장하기
        </Button>
        <div className='w-full flex flex-row items-center justify-between'>
          <ActionIcon
            variant='subtle'
            size='xl'
            radius='md'
            title='뒤로가기'
            onClick={() => router.back()}
          >
            <Back size={32} />
          </ActionIcon>
          <div className='flex flex-col itme-center gap-0.5'>
            <Text size='sm' c='gray'>
              혹시 누끼(배경 제거) 사진이 없으신가요?
            </Text>
            <Button
              variant='subtle'
              size='sm'
              onClick={() => router.push('/lookbooks/editor')}
              className='mt-1'
            >
              에디터로 이동하기 ➡️
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
