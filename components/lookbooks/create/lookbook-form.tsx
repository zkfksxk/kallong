import { ActionIcon } from '@mantine/core';
import { IoAddOutline as Add } from 'react-icons/io5';
import { IoClose as Delete } from 'react-icons/io5';
import { useLookbookEditor } from '@/hooks/useLookbookEditor';

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
          <Add size={32} />
        </ActionIcon>
        <ActionIcon
          variant='outline'
          size='xl'
          radius='md'
          title='삭제'
          disabled={!url}
          onClick={handleRemoveFileAndFinalUrl}
        >
          <Delete size={32} />
        </ActionIcon>
      </div>
    </div>
  );
};
