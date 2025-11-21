'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Tabs } from '@mantine/core';
import { CreateImage } from '@/components/lookbooks/create/create-image';
import { LookbookEditor } from '@/components/lookbooks/editor/lookbook-editor';
import { useLookbookStore } from '@/hooks/lookbook-provider';

export default function LookbooksPage() {
  const router = useRouter();
  const { firstLookbook, secondLookbook } = useLookbookStore((s) => s);
  const [activeTab, setActiveTab] = useState<string | null>('first');

  return (
    <main className='relative bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center px-10 pb-20 justify-between'>
      <Tabs color='black' value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value='first'>{firstLookbook.name || '첫번째 룩'}</Tabs.Tab>
          <Tabs.Tab value='second'>
            {secondLookbook.name || '두번째 룩'}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='first' pt='md'>
          <CreateImage lookbook={firstLookbook} />
          <LookbookEditor target='first' />
        </Tabs.Panel>
        <Tabs.Panel value='second' pt='md'>
          <CreateImage lookbook={secondLookbook} />
          <LookbookEditor target='second' />
        </Tabs.Panel>
      </Tabs>
      <Button
        variant='filled'
        color='blue.9'
        size='lg'
        radius='md'
        onClick={() => router.push('/lookbooks/create')}
      >
        돌아가기
      </Button>
    </main>
  );
}
