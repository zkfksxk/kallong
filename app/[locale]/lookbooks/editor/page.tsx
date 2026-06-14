'use client';

import { useState } from 'react';
import { Tabs } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layouts/header';
import { useLookbookStore } from '@/hooks/provider/lookbook-provider';
import { LookbookEditor } from '../_components/editor/lookbook-editor';

export default function EditLookbookPage() {
  const t = useTranslations();
  const { firstLookbook, secondLookbook } = useLookbookStore((s) => s);
  const [activeTab, setActiveTab] = useState<string | null>('first');

  return (
    <main className='relative bg-white dark:bg-black max-w-125 w-full mx-auto flex flex-1 flex-col items-center pb-20'>
      <Header isBackShow />
      <div className='flex flex-col w-full'>
        <Tabs color='red.5' value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value='first'>
              {firstLookbook.name || t('Lookbook.field.firstLook')}
            </Tabs.Tab>
            <Tabs.Tab value='second'>
              {secondLookbook.name || t('Lookbook.field.secondLook')}
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='first' pt='md'>
            <LookbookEditor target='first' />
          </Tabs.Panel>
          <Tabs.Panel value='second' pt='md'>
            <LookbookEditor target='second' />
          </Tabs.Panel>
        </Tabs>
      </div>
    </main>
  );
}
