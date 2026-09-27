import { Button, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Outfit } from '@/shared/common/types';
import {
  TargetLookbook,
  useLookbookEditor,
} from '../../_hooks/useLookbookEditor';

type Props = {
  targetLookbook: TargetLookbook;
  targetOutfit: keyof Pick<
    Outfit,
    'finalUrl' | 'topUrl' | 'bottomUrl' | 'shoesUrl'
  >;
  title: string;
};

export function OutfitSection({ targetLookbook, targetOutfit, title }: Props) {
  const t = useTranslations('Lookbook.editor');
  const {
    fileInputRef,
    url,
    isLoading,
    handleOpenImagePicker,
    handleUpload,
    handleRemove,
    handleRemoveBackground,
  } = useLookbookEditor(targetLookbook, targetOutfit);

  return (
    <div className='flex flex-col items-center gap-2'>
      <Text>{title}</Text>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleUpload}
        accept='image/*'
        className='hidden'
      />
      <div className='flex gap-2'>
        <Button
          variant='outline'
          disabled={!!url}
          onClick={handleOpenImagePicker}
        >
          {t('imageAdd')}
        </Button>
        <Button
          variant='outline'
          onClick={handleRemove}
          disabled={isLoading || !url}
        >
          {t('imageDelete')}
        </Button>
        <Button
          variant='outline'
          onClick={handleRemoveBackground}
          disabled={isLoading || !url}
          loading={isLoading}
        >
          {t('removeBackground')}
        </Button>
      </div>
    </div>
  );
}
