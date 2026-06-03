'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Textarea } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useGetDailyOutfit, useUpdateDailyOutfit } from '@/apis/querys';
import { Button, Header, showNotification } from '@/components';
import { useProfileStore } from '@/hooks/provider';
import { useRouter } from '@/i18n/navigation';
import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from '@/shared/common/constants/common';
import { DeleteIcon, ImageAddIcon } from '@/shared/common/icons';
import { createSupabaseBrowserClient } from '@/shared/supabase/client';
import { DailyOutfitFormData, dailyOutfitSchema } from '../../_constants/form';
import { useOutfitImageEditor } from '../../_hooks/useOutfitImageEditor';

export default function EditPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('Closet');
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const methods = useForm<DailyOutfitFormData>({
    resolver: zodResolver(dailyOutfitSchema),
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
  const { data: dailyOutfit } = useGetDailyOutfit(id);
  const { mutateAsync: updateMutate } = useUpdateDailyOutfit();

  useEffect(() => {
    if (!dailyOutfit) return;

    reset({
      name: dailyOutfit.name ?? '',
      description: dailyOutfit.description ?? '',
      selected_day: dailyOutfit.selected_day,
    });

    setImage(undefined, dailyOutfit.image_url ?? undefined);
  }, [dailyOutfit]);

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
      showNotification({
        title: 'Image upload Failed',
        message: t('error.imageUploadFailed'),
        type: 'fail',
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
      let finalImageUrl = dailyOutfit?.image_url ?? '';

      if (file) {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          showNotification({
            title: 'Image upload Failed',
            message: t('error.fileTooLarge', { maxMb: MAX_FILE_SIZE_MB }),
            type: 'fail',
          });
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
      showNotification({
        title: 'Closet Failed',
        message: t('error.createFailed'),
        type: 'fail',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='relative bg-white dark:bg-black flex flex-1 flex-col'>
      <Header
        isBackShow
        rightComponent={
          <Button
            onClick={handleSubmit(onSubmit)}
            variant='ghost'
            disabled={!isValid || isSubmitting}
          >
            저장
          </Button>
        }
      />
      <div className='relative w-full max-w-125 aspect-square flex items-center justify-center border border-gray-300 rounded-md overflow-hidden'>
        {url && (
          <>
            <Image src={url} alt='daily-outfit' fill />
            <Button
              variant='ghost'
              disabled={!url}
              onClick={handleRemove}
              className='absolute top-3 right-3 z-10 flex items-center justify-center !w-10 !h-10 rounded-full bg-white shadow-md'
            >
              <DeleteIcon size={24} className='text-black' />
            </Button>
          </>
        )}
      </div>
      <div className='flex flex-col items-center mt-8'>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleUpload}
          accept='image/*'
          className='hidden'
        />
        <div className='flex justify-center'>
          <Button
            variant='filled'
            onClick={handleOpenImagePicker}
            className='py-1'
            icon={<ImageAddIcon size={24} color='white' />}
          >
            이미지 추가하기
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-10 mt-10'>
        <TextInput
          maxLength={20}
          label={t('title')}
          placeholder={t('validation.nameMax')}
          {...register('name')}
          error={errors.name?.message ? t(errors.name.message) : undefined}
        />
        <Textarea
          maxLength={500}
          label={t('description')}
          placeholder={t('validation.descriptionMax')}
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
