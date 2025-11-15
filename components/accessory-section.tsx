'use client';

import { useState } from 'react';
import { Button, Tabs, Text } from '@mantine/core';
import { TargetLookbook, useLookbookEditor } from '@/hooks/useLookbookEditor';
import { AccessoryCategory } from '@/shared/common/types';

type Props = {
  targetLookbook: TargetLookbook;
};

export function AccessorySection({ targetLookbook }: Props) {
  const [category, setCategory] = useState<AccessoryCategory>('hat');

  const {
    fileInputRef,
    url,
    handleOpenImagePicker,
    handleUpload,
    handleRemove,
  } = useLookbookEditor(targetLookbook, 'accessoryUrls', category);

  return (
    <Tabs
      value={category}
      onChange={(v) => setCategory((v as AccessoryCategory) ?? 'hat')}
      orientation='vertical'
    >
      <Tabs.List>
        <Tabs.Tab value='hat'>모자</Tabs.Tab>
        <Tabs.Tab value='bag'>가방</Tabs.Tab>
        <Tabs.Tab value='etc'>기타</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='hat' pl='md'>
        <AccessoryPanel
          title='모자'
          url={url ?? ''}
          onOpenImagePicker={handleOpenImagePicker}
          onUpload={handleUpload}
          onRemove={handleRemove}
          fileRef={fileInputRef}
        />
      </Tabs.Panel>

      <Tabs.Panel value='bag' pl='md'>
        <AccessoryPanel
          title='가방'
          url={url ?? ''}
          onOpenImagePicker={handleOpenImagePicker}
          onUpload={handleUpload}
          onRemove={handleRemove}
          fileRef={fileInputRef}
        />
      </Tabs.Panel>

      <Tabs.Panel value='etc' pl='md'>
        <AccessoryPanel
          title='기타'
          url={url ?? ''}
          onOpenImagePicker={handleOpenImagePicker}
          onUpload={handleUpload}
          onRemove={handleRemove}
          fileRef={fileInputRef}
        />
      </Tabs.Panel>
    </Tabs>
  );
}

type PanelProps = {
  title: string;
  url: string;
  onOpenImagePicker: () => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
};

function AccessoryPanel({
  title,
  url,
  onOpenImagePicker,
  onUpload,
  onRemove,
  fileRef,
}: PanelProps) {
  return (
    <div className='flex flex-col items-center gap-3'>
      <Text>{title}를 추가해 보세요! (최대 2장)</Text>

      <input
        type='file'
        ref={fileRef}
        onChange={onUpload}
        accept='image/*'
        className='hidden'
      />
      <div className='flex gap-2'>
        <Button variant='outline' onClick={onOpenImagePicker} disabled={!!url}>
          추가
        </Button>
        <Button
          variant='outline'
          color='red'
          onClick={onRemove}
          disabled={!url}
        >
          제거
        </Button>
      </div>
    </div>
  );
}
