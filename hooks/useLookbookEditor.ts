'use client';

import { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { useRemoveBackground } from '@/apis/querys/useRemoveBackground';
import { useLookbookStore } from '@/hooks/provider/lookbook-provider';
import { AccessoryCategory, Outfit } from '@/shared/common/types';
import { base64ToFile } from '@/shared/common/utils';

export type TargetLookbook = 'first' | 'second';
export type TargetOutfit = keyof Outfit;

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export function useLookbookEditor(
  targetLookbook: TargetLookbook,
  targetOutfit: TargetOutfit,
  category?: AccessoryCategory
) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    firstLookbook,
    secondLookbook,
    updateFirstLookbook,
    updateSecondLookbook,
  } = useLookbookStore((s) => s);
  const { mutateAsync: removeBgAsync } = useRemoveBackground();

  const lookbook = targetLookbook === 'first' ? firstLookbook : secondLookbook;
  const isAccessory = targetOutfit === 'accessoryUrls';
  const url = isAccessory
    ? lookbook.data.accessoryUrls?.[category ?? 'hat']
    : (lookbook.data[targetOutfit] as string | undefined);

  const handleOpenImagePicker = () => fileInputRef.current?.click();

  const setUrl = (value: string | undefined) => {
    if (isAccessory) {
      const newAccessoryUrls = {
        ...(lookbook.data.accessoryUrls ?? { hat: '', bag: '', etc: '' }),
        [category ?? 'hat']: value ?? '',
      };

      if (targetLookbook === 'first')
        updateFirstLookbook({ accessoryUrls: newAccessoryUrls });
      else updateSecondLookbook({ accessoryUrls: newAccessoryUrls });
    } else {
      if (targetLookbook === 'first')
        updateFirstLookbook({ [targetOutfit]: value } as Partial<Outfit>);
      else updateSecondLookbook({ [targetOutfit]: value } as Partial<Outfit>);
    }
  };

  const setFileAndFinalUrl = (newFile?: File, newUrl?: string) => {
    const prevUrl = lookbook.data.finalUrl;

    const patch: Partial<Outfit> = {
      finalFile: newFile,
      finalUrl: newUrl,
    };

    if (targetLookbook === 'first') {
      updateFirstLookbook(patch);
    } else {
      updateSecondLookbook(patch);
    }

    if (prevUrl && prevUrl.startsWith('blob:')) {
      URL.revokeObjectURL(prevUrl);
    }
  };

  const handleRemoveFileAndFinalUrl = () =>
    setFileAndFinalUrl(undefined, undefined);

  const handleRemove = () => setUrl(undefined);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    if (isAccessory) {
      const current = lookbook.data.accessoryUrls ?? {
        hat: '',
        bag: '',
        etc: '',
      };
      const filledCount = Object.values(current).filter(Boolean).length;
      if (filledCount >= 2 && !current[category ?? 'hat']) {
        alert('악세사리는 최대 2개까지만 추가할 수 있어요.');
        input.value = '';
        return;
      }
    }

    try {
      // 이미지 압축
      const compressedFile = await imageCompression(file, options);
      const compressedUrl = URL.createObjectURL(compressedFile);

      if (targetOutfit === 'finalUrl') {
        setFileAndFinalUrl(compressedFile, compressedUrl);
      } else {
        setUrl(compressedUrl);
      }
    } catch (error) {
      console.error('Image compression failed:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
      input.value = ''; // 입력 초기화
    }
  };

  const handleRemoveBackground = async () => {
    if (!url) return;
    setIsLoading(true);

    try {
      // const blob = await fetch(url).then((res) => res.blob());
      // const file = new File([blob], 'image.png', { type: blob.type });

      const file = lookbook.data.finalFile!;
      const formData = new FormData();
      formData.append('image', file);

      const data = await removeBgAsync(file);
      const newUrl = `data:image/png;base64,${data.image}`;
      const newFile = base64ToFile(data.image);
      setFileAndFinalUrl(newFile, newUrl);
    } catch (err) {
      console.error(err);
      alert('배경 제거 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fileInputRef,
    url,
    isLoading,
    handleOpenImagePicker,
    handleUpload,
    handleRemove,
    handleRemoveFileAndFinalUrl,
    handleRemoveBackground,
  };
}
