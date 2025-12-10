import { Button, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { TargetLookbook, useLookbookEditor } from '@/hooks/useLookbookEditor';
import { Outfit } from '@/shared/common/types';

type Props = {
  targetLookbook: TargetLookbook;
  targetOutfit: keyof Pick<
    Outfit,
    'finalUrl' | 'topUrl' | 'bottomUrl' | 'shoesUrl'
  >;
  title: string;
};

export function OutfitSection({ targetLookbook, targetOutfit, title }: Props) {
  const t = useTranslations('Lookbooks.editor');
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
          {t('addButton')}
        </Button>
        <Button
          variant='outline'
          onClick={handleRemove}
          disabled={isLoading || !url}
        >
          {t('removeButton')}
        </Button>
        <Button
          variant='outline'
          onClick={handleRemoveBackground}
          disabled={isLoading || !url}
          loading={isLoading}
        >
          {t('removeBgButton')}
        </Button>
      </div>
    </div>
  );
}
