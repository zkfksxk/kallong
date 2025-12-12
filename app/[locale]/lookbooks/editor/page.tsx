'use client';

import { useState } from 'react';
import { ActionIcon, Tabs } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { CreateImage } from '@/components/lookbooks/create/create-image';
import { LookbookEditor } from '@/components/lookbooks/editor/lookbook-editor';
import { useLookbookStore } from '@/hooks/provider/lookbook-provider';
import { useRouter } from '@/i18n/navigation';
import { ICONS } from '@/shared/common/icon';

export default function EditLookbookPage() {
  const t = useTranslations('Lookbooks.editor');
  const router = useRouter();
  const { firstLookbook, secondLookbook } = useLookbookStore((s) => s);
  const [activeTab, setActiveTab] = useState<string | null>('first');
  const { Back } = ICONS;

  return (
    <main className='relative bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center pb-20'>
      <div className='w-full h-15 flex items-center '>
        <ActionIcon
          variant='subtle'
          size='xl'
          radius='md'
          title={t('backButton')}
          onClick={() => router.push('/lookbooks/create')}
        >
          <Back color='black' size={24} />
        </ActionIcon>
      </div>
      <div className='flex flex-col w-full px-5'>
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
      </div>
    </main>
  );
}
