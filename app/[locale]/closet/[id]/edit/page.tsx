'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActionIcon, Button, TextInput, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useGetDailyOutfit } from '@/apis/querys/outfit/useGetDailyOutfit';
import { useUpdateDailyOutfit } from '@/apis/querys/outfit/useUpdateDailyOutfit';
import { Header } from '@/components/layouts/header';
import { useProfileStore } from '@/hooks/provider/profile-provider';
import { useOutfitImageEditor } from '@/hooks/useOutfitImageEditor';
import { useRouter } from '@/i18n/navigation';
import {
  DailyOutfitFormData,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  dailOutfitSchema,
} from '@/shared/common/constants';
import { ICONS } from '@/shared/common/icons';
import { createSupabaseBrowserClient } from '@/shared/supabase/client';

export default function EditPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('Closet');
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const methods = useForm<DailyOutfitFormData>({
    resolver: zodResolver(dailOutfitSchema),
    defaultValues: {
      name: '',
      description: '',
      selected_day: '',
    },
    mode: 'onChange',
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;
  const {
    fileInputRef,
    file,
    url,
    setImage,
    handleOpenImagePicker,
    handleUpload,
    handleRemove,
  } = useOutfitImageEditor();
  const { profile } = useProfileStore((s) => s);
  const { data: dailyoutfit } = useGetDailyOutfit(id);
  const { mutateAsync: updateMutate } = useUpdateDailyOutfit();

  const { Add, Delete, Alert } = ICONS;

  useEffect(() => {
    if (dailyoutfit) {
      reset({
        name: dailyoutfit.name ?? '',
        description: dailyoutfit.description ?? '',
        selected_day: dailyoutfit.selected_day,
      });
      setImage(undefined, dailyoutfit.image_url ?? undefined);
    }
  }, [dailyoutfit]);

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
      notifications.show({
        title: 'Image upload Failed',
        message: t('error.imageUploadFailed'),
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

  const onSubmit = async (data: DailyOutfitFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let finalImageUrl = dailyoutfit?.image_url ?? '';

      if (file) {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          notifications.show({
            title: 'Image upload Failed',
            message: t('error.fileTooLarge', { maxMb: MAX_FILE_SIZE_MB }),
            icon: <Alert.Close color='red' size={24} />,
            withCloseButton: false,
            loading: false,
            color: 'transperant',
          });
          setIsSubmitting(false);
          return;
        }

        const uploadedUrl = await uploadFile(id, file);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        } else {
          throw new Error('이미지 업로드에 실패했습니다.');
        }
      }

      await updateMutate({
        id: id,
        image_url: finalImageUrl!,
        name: data.name,
        description: data.description,
      });

      router.push('/closet');
    } catch {
      notifications.show({
        title: 'Closet Failed',
        message: t('error.createFailed'),
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
    <div className='relative bg-white dark:bg-black flex flex-1 flex-col'>
      <Header
        isBackbutton
        rightComponent={
          <Button
            onClick={handleSubmit(onSubmit)}
            variant='transparent'
            color='red.5'
            size='md'
            radius='md'
            p={0}
            disabled={!isValid || isSubmitting}
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
          {...register('name')}
          error={errors.name?.message ? t(errors.name.message) : undefined}
        />
        <Textarea
          maxLength={500}
          {...register('description')}
          error={
            errors.description?.message
              ? t(errors.description.message)
              : undefined
          }
        />
      </div>
    </div>
  );
}
