'use client';

import { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { useTranslations } from 'next-intl';
import { showNotification } from '@/components';
import { COMPRESSION_OPTIONS } from '@/shared/common/constants';

export function useOutfitImageEditor() {
  const t = useTranslations();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setImage = (newFile?: File, newUrl?: string) => {
    if (url?.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
    setFile(newFile);
    setUrl(newUrl);
  };

  const handleOpenImagePicker = () => fileInputRef.current?.click();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);
      const compressedUrl = URL.createObjectURL(compressedFile);

      setImage(compressedFile, compressedUrl);
    } catch {
      showNotification({
        title: 'Closet Failed',
        message: t('Closet.error.imageCompressionFailed'),
        type: 'fail',
      });
    } finally {
      setIsLoading(false);
      input.value = '';
    }
  };

  const handleRemove = () => {
    if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
    setImage(undefined, undefined);
  };

  return {
    fileInputRef,
    file,
    url,
    isLoading,
    setImage,
    handleOpenImagePicker,
    handleUpload,
    handleRemove,
  };
}
