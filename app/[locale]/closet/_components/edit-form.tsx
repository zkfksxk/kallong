'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Textarea } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useUpdateDailyOutfit } from '@/apis/querys';
import { Button, Header, showNotification } from '@/components';
import { useProfileStore } from '@/hooks/provider';
import { useRouter } from '@/i18n/navigation';
import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from '@/shared/common/constants/file';
import { DeleteIcon, ImageAddIcon } from '@/shared/common/icons';
import { createSupabaseBrowserClient } from '@/shared/supabase/client';
import { DailyOutfitFormData, dailyOutfitSchema } from '../_constants/form';
import { useOutfitImageEditor } from '../_hooks/useOutfitImageEditor';

type DailyOutfit = {
  id: string;
  name: string | null;
  description: string | null;
  selected_day: string;
  image_url: string | null;
};

interface Props {
  dailyOutfit: DailyOutfit;
}

export default function EditDailyOutfitForm({ dailyOutfit }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations();
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
        title: t('Common.fail', { type: t('Common.imageUpload') }),
        message: t('Closet.error.imageUploadFailed'),
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
      const finalImageUrl = dailyOutfit?.image_url ?? '';

      if (!file) {
        showNotification({
          title: 'Closet Failed',
          message: t('Closet.validation.imageRequired'),
          type: 'fail',
        });
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        showNotification({
          title: 'Image upload Failed',
          message: t('Closet.error.fileTooLarge', {
            maxMb: MAX_FILE_SIZE_MB,
          }),
          type: 'fail',
        });
        return;
      }

      const uploadedUrl = await uploadFile(id, file);
      if (!uploadedUrl) throw new Error('Failed to upload image');

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
        message: t('Closet.error.createFailed'),
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
            {t('Common.save')}
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
            {t('Closet.imageAdd')}
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-10 mt-10'>
        <TextInput
          maxLength={20}
          label={t('Closet.field.title')}
          placeholder={t('Validation.maxLength', { max: 20 })}
          {...register('name')}
          error={errors.name?.message ? t(errors.name.message) : undefined}
        />
        <Textarea
          maxLength={500}
          label={t('Closet.field.description')}
          placeholder={t('Validation.maxLength', { max: 500 })}
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
