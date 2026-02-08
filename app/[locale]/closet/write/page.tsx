'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ActionIcon, Button, TextInput, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useCreatDailyOutfit } from '@/apis/querys/outfit/useCreateDailyOutfit';
import { useUpdateDailyOutfitImage } from '@/apis/querys/outfit/useUpdateDailyOutfitImage';
import { Header } from '@/components/layouts/header';
import { useOutfitStore } from '@/hooks/provider/outfit-provider';
import { useProfileStore } from '@/hooks/provider/profile-provider';
import { useOutfitEditor } from '@/hooks/useOutfitEditor';
import { useRouter } from '@/i18n/navigation';
import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from '@/shared/common/constants';
import { ICONS } from '@/shared/common/icons';
import { createSupabaseBrowserClient } from '@/shared/supabase/client';

export default function WritePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    fileInputRef,
    url,
    handleOpenImagePicker,
    handleUpload,
    handleRemove,
  } = useOutfitEditor();
  const { dailyOutfit, reset } = useOutfitStore((s) => s);
  const { profile } = useProfileStore((s) => s);
  const { mutateAsync: createMutate } = useCreatDailyOutfit();
  const { mutateAsync: updateMutate } = useUpdateDailyOutfitImage();
  const { Add, Delete, Alert } = ICONS;

  const uploadFile = async (outfitId: string, file: File) => {
    if (!profile) return;

    const supabase = createSupabaseBrowserClient();

    const fileExtension = file.name.split('.').pop() || 'webp';
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
    const filePath = `${profile.id}/${outfitId}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_OUTFIT_STORAGE_BUCKET!)
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
      .from(process.env.NEXT_PUBLIC_OUTFIT_STORAGE_BUCKET!)
      .getPublicUrl(uploadData.path);

    return publicUrl;
  };

  const handleSubmit = async () => {
    if (isSubmitting || !dailyOutfit) return;

    const file = dailyOutfit.file;
    if (!file) return;

    setIsSubmitting(true);
    if (file.size > MAX_FILE_SIZE_BYTES) {
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
      const newOutfit = await createMutate({
        name,
        description,
        selected_day: dailyOutfit.selected_day,
      });
      const publicUrl = await uploadFile(newOutfit.id, file);

      if (!publicUrl) throw new Error('Failed to upload image');

      await updateMutate({
        id: newOutfit.id,
        image_url: publicUrl,
      });

      router.push('/closet');
    } catch (error) {
      console.log('create fail', error);
      notifications.show({
        title: 'Closet Failed',
        message: 'Closet 생성 중 에러가 발생했습니다.',
        icon: <Alert.Close color='red' size={24} />,
        withCloseButton: false,
        loading: false,
        color: 'transperant',
      });
    } finally {
      setIsSubmitting(false);
      reset();
    }
  };

  return (
    <div className='relative bg-white dark:bg-black flex flex-1 flex-col'>
      <Header
        isBackbutton
        rightComponent={
          <Button
            onClick={handleSubmit}
            variant='transparent'
            color='red.5'
            size='md'
            radius='md'
            p={0}
          >
            저장
          </Button>
        }
      />
      <div className='relative w-full max-w-125 aspect-square flex items-center justify-center border border-gray-300 rounded-md overflow-hidden'>
        {url && <Image src={url} alt='daily-outfit' fill />}
      </div>
      <div className='flex flex-col items-center mt-8'>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleUpload}
          accept='image/*'
          className='hidden'
        />
        <div className='flex gap-8'>
          <ActionIcon
            variant='outline'
            size='xl'
            radius='md'
            title='추가'
            onClick={handleOpenImagePicker}
          >
            <Add size={32} className='text-black dark:text-white' />
          </ActionIcon>
          <ActionIcon
            variant='outline'
            size='xl'
            radius='md'
            title='삭제'
            disabled={!url}
            onClick={handleRemove}
          >
            <Delete size={32} className='text-black dark:text-white' />
          </ActionIcon>
        </div>
      </div>
      <div className='flex flex-col gap-10 mt-10'>
        <TextInput
          maxLength={20}
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          placeholder='20자 미만으로 입력해주세요.'
        />
        <Textarea
          maxLength={500}
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
          placeholder='500자 미만으로 입력해주세요.'
        />
      </div>
    </div>
  );
}
