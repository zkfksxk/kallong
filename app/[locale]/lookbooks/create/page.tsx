'use client';

import { useState } from 'react';
import { ActionIcon, Button, Tabs, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useCreateLookbook } from '@/apis/querys/useCreateLookbook';
import { useCreateVote } from '@/apis/querys/useCreateVote';
import { useUpdateLookbook } from '@/apis/querys/useUpdateLookbook';
import { CreateImage } from '@/components/lookbooks/create/create-image';
import { LookbookForm } from '@/components/lookbooks/create/lookbook-form';
import { useLookbookStore } from '@/hooks/provider/lookbook-provider';
import { useRouter } from '@/i18n/navigation';
import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from '@/shared/common/constants';
import { ICONS } from '@/shared/common/icons';
import { createSupabaseBrowserClient } from '@/shared/supabase/client';

export default function CreateLookbooksPage() {
  const t = useTranslations('Lookbooks.create');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>('first');
  const { firstLookbook, secondLookbook } = useLookbookStore((s) => s);
  const { mutateAsync: createMutate } = useCreateLookbook();
  const { mutateAsync: updateMutate } = useUpdateLookbook();
  const { mutateAsync: createVoteMutate } = useCreateVote();

  const { Back, Alert } = ICONS;

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
      console.log('storage image upload fail', uploadError);
      notifications.show({
        title: 'Image upload Failed',
        message: '이미지 업로드에 실패했습니다.',
        icon: <Alert.Close color='red' size={24} />,
        withCloseButton: false,
        loading: false,
        color: 'transperant',
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
    setIsSubmitting(true);

    //2개의 Lookbook생성후 id 받음. MAX_FILE_SIZE_MB: 4MB;
    const file1 = firstLookbook.data.finalFile;
    const file2 = secondLookbook.data.finalFile;

    if (
      file1!.size > MAX_FILE_SIZE_BYTES ||
      file2!.size > MAX_FILE_SIZE_BYTES
    ) {
      notifications.show({
        title: 'Image upload Failed',
        message: `파일 크기가 ${MAX_FILE_SIZE_MB}MB를 초과해 업로드할 수 없습니다.`,
        icon: <Alert.Close color='red' size={24} />,
        withCloseButton: false,
        loading: false,
        color: 'transperant',
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
    } catch (error) {
      console.log('create lookbook fail', error);
      notifications.show({
        title: 'Lookbook Failed',
        message: '룩북 생성 중 에러가 발생했습니다.',
        icon: <Alert.Close color='red' size={24} />,
        withCloseButton: false,
        loading: false,
        color: 'transperant',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='relative bg-white dark:bg-black max-w-125 w-full mx-auto flex flex-1 flex-col items-center pb-20'>
      <div className='w-full h-15 flex items-center '>
        <ActionIcon
          variant='subtle'
          size='xl'
          radius='md'
          title={t('backButton')}
          disabled={isSubmitting}
          onClick={() => router.push('/lookbooks')}
        >
          <Back className='text-black dark:text-white' size={24} />
        </ActionIcon>
      </div>
      <div className='flex flex-col w-full px-5 gap-8'>
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
            <LookbookForm targetLookbook='first' />
          </Tabs.Panel>
          <Tabs.Panel value='second' pt='md'>
            <CreateImage lookbook={secondLookbook} />
            <LookbookForm targetLookbook='second' />
          </Tabs.Panel>
        </Tabs>
        <Button
          variant='filled'
          color='red.5'
          size='lg'
          radius='md'
          onClick={handleSubmit}
          disabled={!isReadyToSubmit || isSubmitting}
          loading={isSubmitting}
        >
          {t('saveButton')}
        </Button>
      </div>

      <div className='flex flex-col itme-center mt-15 gap-0.5'>
        <Text size='sm'>{t('bgRemoveQuestion')}</Text>
        <Button
          variant='transparent'
          size='sm'
          disabled={isSubmitting}
          onClick={() => router.push('/lookbooks/editor')}
        >
          {t('editorButton')}
        </Button>
      </div>
    </main>
  );
}
