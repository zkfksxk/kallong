'use client';

import { useState } from 'react';
import { Button, Tabs } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { CreateImage } from '@/components/lookbooks/create/create-image';
import { LookbookEditor } from '@/components/lookbooks/editor/lookbook-editor';
import { useLookbookStore } from '@/hooks/lookbook-provider';
import { useRouter } from '@/i18n/navigation';

export default function LookbooksPage() {
  const t = useTranslations('Lookbooks.editor');
  const router = useRouter();
  const { firstLookbook, secondLookbook } = useLookbookStore((s) => s);
  const [activeTab, setActiveTab] = useState<string | null>('first');

  return (
    <main className='relative bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center px-10 pb-20 justify-between'>
      <Tabs color='black' value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value='first'>
            {firstLookbook.name || t('tabFirst')}
          </Tabs.Tab>
          <Tabs.Tab value='second'>
            {secondLookbook.name || t('tabSecond')}
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
        {t('backButton')}
      </Button>
    </main>
  );
}
