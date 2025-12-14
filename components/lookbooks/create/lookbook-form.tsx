import { ActionIcon } from '@mantine/core';
import { useLookbookEditor } from '@/hooks/useLookbookEditor';
import { ICONS } from '@/shared/common/icon';

type Props = { targetLookbook: 'first' | 'second' };

export const LookbookForm = ({ targetLookbook }: Props) => {
  const {
    fileInputRef,
    url,
    handleOpenImagePicker,
    handleUpload,
    handleRemoveFileAndFinalUrl,
  } = useLookbookEditor(targetLookbook, 'finalUrl');

  const { Add, Delete } = ICONS;

  return (
    <div className='flex flex-col items-center mt-8'>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleUpload}
        accept='image/*'
        className='hidden'
      />
      <div className='flex gap-8'>
        <ActionIcon
          variant='filled'
          size='xl'
          radius='md'
          title='추가'
          color='red.3'
          onClick={handleOpenImagePicker}
        >
          <Add size={32} color='black' />
        </ActionIcon>
        <ActionIcon
          variant='filled'
          size='xl'
          radius='md'
          title='삭제'
          disabled={!url}
          color='red.3'
          onClick={handleRemoveFileAndFinalUrl}
        >
          <Delete size={32} color='black' />
        </ActionIcon>
      </div>
    </div>
  );
};
