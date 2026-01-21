'use client';

import { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { COMPRESSION_OPTIONS } from '@/shared/common/constants';
import { DailyOutfitForm } from '@/shared/common/types';
import { useOutfitStore } from './provider/outfit-provider';

export function useOutfitEditor() {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { dailyOutfit, setDailyOutfit } = useOutfitStore((s) => s);

  const setUrl = (newFile?: File, newUrl?: string) => {
    const prevUrl = dailyOutfit?.image_url;

    const patch: Partial<DailyOutfitForm> = {
      image_url: newUrl,
      file: newFile,
    };

    setDailyOutfit(patch);

    if (prevUrl && prevUrl.startsWith('blob:')) {
      URL.revokeObjectURL(prevUrl);
    }
  };

  const handleOpenImagePicker = () => fileInputRef.current?.click();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    try {
      const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);
      const compressedUrl = URL.createObjectURL(compressedFile);

      setUrl(file, compressedUrl);
    } catch (error) {
      console.error('Image compression failed:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
      input.value = '';
    }
  };

  const handleRemove = () => {
    setUrl(undefined, undefined);
  };

  return {
    fileInputRef,
    url: dailyOutfit?.image_url,
    setUrl,
    isLoading,
    handleOpenImagePicker,
    handleUpload,
    handleRemove,
  };
}
