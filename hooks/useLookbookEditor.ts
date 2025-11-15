'use client';

import { useRef } from 'react';
import { useRemoveBackground } from '@/apis/querys/useRemoveBackground';
import { useLookbookStore } from '@/hooks/lookbook-provider';
import { AccessoryCategory, Outfit } from '@/shared/common/types';

export type TargetLookbook = 'first' | 'second';
export type TargetOutfit = keyof Outfit;

export function useLookbookEditor(
  targetLookbook: TargetLookbook,
  targetOutfit: TargetOutfit,
  category?: AccessoryCategory
) {
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

  const handleRemove = () => setUrl(undefined);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setUrl(url);
      input.value = '';
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBackground = async () => {
    if (!url) return;

    try {
      const blob = await fetch(url).then((res) => res.blob());
      const file = new File([blob], 'image.png', { type: blob.type });

      const formData = new FormData();
      formData.append('image', file);

      const data = await removeBgAsync(file);
      // const res = await fetch('http://localhost:4000/api/remove-bg', {
      //   method: 'POST',
      //   body: formData,
      // });
      // if (!res.ok) throw new Error('remove-bg failed');

      // const data = await res.json();
      const newUrl = `data:image/png;base64,${data.image}`;
      setUrl(newUrl);
    } catch (err) {
      console.error(err);
      alert('배경 제거 중 오류가 발생했습니다.');
    }
  };

  return {
    fileInputRef,
    url,
    handleOpenImagePicker,
    handleUpload,
    handleRemove,
    handleRemoveBackground,
    setUrl,
  };
}
