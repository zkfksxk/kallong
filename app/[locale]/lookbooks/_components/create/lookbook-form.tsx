import { ActionIcon } from '@mantine/core';
import { AddIcon, DeleteIcon } from '@/shared/common/icons';
import { useLookbookEditor } from '../../_hooks/useLookbookEditor';

type Props = { targetLookbook: 'first' | 'second' };

export const LookbookForm = ({ targetLookbook }: Props) => {
  const {
    fileInputRef,
    url,
    handleOpenImagePicker,
    handleUpload,
    handleRemoveFileAndFinalUrl,
  } = useLookbookEditor(targetLookbook, 'finalUrl');

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
          variant='outline'
          size='xl'
          radius='md'
          title='추가'
          onClick={handleOpenImagePicker}
        >
          <AddIcon size={32} color='black' />
        </ActionIcon>
        <ActionIcon
          variant='outline'
          size='xl'
          radius='md'
          title='삭제'
          disabled={!url}
          onClick={handleRemoveFileAndFinalUrl}
        >
          <DeleteIcon size={32} color='black' />
        </ActionIcon>
      </div>
    </div>
  );
};
