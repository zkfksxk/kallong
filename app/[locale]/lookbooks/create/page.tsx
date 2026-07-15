'use client';

import { useState } from 'react';
import { Tabs, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import {
  useCreateLookbook,
  useCreateVote,
  useUpdateLookbook,
} from '@/apis/querys';
import { Button, showNotification } from '@/components';
import { Header } from '@/components/layouts/header';
import { useLookbookStore } from '@/hooks/provider/lookbook-provider';
import { useRouter } from '@/i18n/navigation';
import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from '@/shared/common/constants/file';
import { createSupabaseBrowserClient } from '@/shared/supabase/client';
import { LookbookForm } from '../_components';

export default function CreateLookbooksPage() {
  const t = useTranslations();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>('first');
  const { firstLookbook, secondLookbook } = useLookbookStore((s) => s);
  const { mutateAsync: createMutate } = useCreateLookbook();
  const { mutateAsync: updateMutate } = useUpdateLookbook();
  const { mutateAsync: createVoteMutate } = useCreateVote();

  const isReadyToSubmit =
    firstLookbook.data.finalUrl && secondLookbook.data.finalUrl;

  const uploadFile = async (lookbookId: string, file: File) => {
    const supabase = createSupabaseBrowserClient();

    const fileExtension = file.name.split('.').pop() || 'webp';
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
    const filePath = `${lookbookId}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
      .upload(filePath, file, { upsert: true }); // upset: true 존재x -> insert, 존재o -> update

    if (uploadError) {
      showNotification({
        title: t('Common.fail', { type: t('Lookbook.editor.imageTab') }),
        message: t('Common.errorOccurred'),
        type: 'fail',
      });
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
      .getPublicUrl(uploadData.path);

    return publicUrl;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!isReadyToSubmit) return;

    setIsSubmitting(true);

    //2개의 Lookbook생성후 id 받음. MAX_FILE_SIZE_MB: 2MB;
    const file1 = firstLookbook.data.finalFile;
    const file2 = secondLookbook.data.finalFile;

    if (
      file1!.size > MAX_FILE_SIZE_BYTES ||
      file2!.size > MAX_FILE_SIZE_BYTES
    ) {
      showNotification({
        title: t('Common.fail', { type: t('Lookbook.editor.imageTab') }),
        message: t('Lookbook.error.fileTooLarge', {
          maxMb: MAX_FILE_SIZE_MB,
        }),
        type: 'fail',
      });
      return;
    }

    try {
      const firstLookbookProps = {
        voteName: firstLookbook.voteName,
        name: firstLookbook.name,
      };
      const secondLookbookProps = {
        voteName: secondLookbook.voteName,
        name: secondLookbook.name,
      };

      const [firstData, secondData] = await Promise.all([
        createMutate(firstLookbookProps),
        createMutate(secondLookbookProps),
      ]);

      const [firstImageUrl, secondImageUrl] = await Promise.all([
        uploadFile(firstData.id, firstLookbook.data.finalFile!),
        uploadFile(secondData.id, secondLookbook.data.finalFile!),
      ]);

      await Promise.all([
        updateMutate({ id: firstData.id, image_url: firstImageUrl! }),
        updateMutate({ id: secondData.id, image_url: secondImageUrl! }),
      ]);

      const voteSetData = {
        lookbook_id_a: firstData.id,
        lookbook_id_b: secondData.id,
        vote_name: firstLookbook.voteName,
      };
      await createVoteMutate(voteSetData);

      router.push(`/lookbooks/result/${firstData.id}/${secondData.id}`);
    } catch {
      showNotification({
        title: 'Lookbook Failed',
        message: t('Lookbook.error.createFailed'),
        type: 'fail',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='relative bg-white dark:bg-black max-w-125 w-full mx-auto flex flex-1 flex-col items-center'>
      <Header
        isBackShow
        rightComponent={
          <Button
            variant='ghost'
            onClick={handleSubmit}
            disabled={isSubmitting || !isReadyToSubmit}
          >
            {t('Common.save')}
          </Button>
        }
      />
      <div className='flex flex-col w-full gap-8'>
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
            <LookbookForm targetLookbook='first' />
          </Tabs.Panel>
          <Tabs.Panel value='second' pt='md'>
            <LookbookForm targetLookbook='second' />
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className='flex flex-col items-center mt-15 gap-0.5'>
        <Text size='sm'>{t('Lookbook.create.bgRemoveQuestion')}</Text>
        <Button
          variant='ghost'
          disabled={isSubmitting}
          onClick={() => router.push('/lookbooks/editor')}
        >
          {t('Lookbook.create.moveToEditor')}
        </Button>
      </div>
    </main>
  );
}
