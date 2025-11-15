'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Tabs } from '@mantine/core';
import { LookbookEditor } from '@/components/lookbook-editor';
import { LookbookImage } from '@/components/lookbook-image';
import { useLookbookStore } from '@/hooks/lookbook-provider';

export default function LookbooksPage() {
  const router = useRouter();
  const { firstLookbook, secondLookbook } = useLookbookStore((s) => s);
  const [activeTab, setActiveTab] = useState<string | null>('first');

  return (
    <main className='bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center  px-20 gap-10'>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value='first'>{firstLookbook.name || '첫번째 룩'}</Tabs.Tab>
          <Tabs.Tab value='second'>
            {secondLookbook.name || '두번째 룩'}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='first' pt='md'>
          <LookbookImage lookbook={firstLookbook} />
          <LookbookEditor target='first' />
        </Tabs.Panel>
        <Tabs.Panel value='second' pt='md'>
          <LookbookImage lookbook={secondLookbook} />
          <LookbookEditor target='second' />
        </Tabs.Panel>
      </Tabs>
      <Button variant='filed' onClick={() => router.push('/lookbooks/result')}>
        결과 확인하기
      </Button>
    </main>
  );
}
