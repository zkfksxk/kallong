'use client';

import { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { COMPRESSION_OPTIONS } from '@/shared/common/constants';

export function useOutfitImageEditor() {
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
    } catch (error) {
      console.error('Image compression failed:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
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
