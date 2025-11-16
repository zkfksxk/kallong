import { Button, Text } from '@mantine/core';
import { TargetLookbook, useLookbookEditor } from '@/hooks/useLookbookEditor';
import { Outfit } from '@/shared/common/types';

type Props = {
  targetLookbook: TargetLookbook;
  targetOutfit: keyof Pick<Outfit, 'topUrl' | 'bottomUrl' | 'shoesUrl'>;
  title: string;
};

export function OutfitSection({ targetLookbook, targetOutfit, title }: Props) {
  const {
    fileInputRef,
    url,
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
        <Button variant='outline' onClick={handleOpenImagePicker}>
          추가
        </Button>
        <Button
          variant='outline'
          onClick={handleRemoveBackground}
          disabled={!url}
        >
          배경 제거
        </Button>
        <Button variant='outline' onClick={handleRemove} disabled={!url}>
          사진 제거
        </Button>
      </div>
    </div>
  );
}
