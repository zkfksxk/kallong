import { ActionIcon, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDeleteLookbookById } from '@/apis/querys/useDeleteLookbookById';
import { Link } from '@/i18n/navigation';
import { ICONS } from '@/shared/common/icons';

type Props = {
  vote_name: string;
  lookbook_id_a: string;
  lookbook_id_b: string;
};

export const LookbookItem = ({
  vote_name,
  lookbook_id_a,
  lookbook_id_b,
}: Props) => {
  const { Trash, Alert } = ICONS;
  const { mutateAsync: deleteLookbookById } = useDeleteLookbookById();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await Promise.all([
        deleteLookbookById(lookbook_id_a),
        deleteLookbookById(lookbook_id_b),
      ]);
    } catch {
      notifications.show({
        title: 'Lookbook Failed',
        message: '룩북 삭제 중 에러가 발생했습니다.',
        icon: <Alert.Close color='red' size={24} />,
        withCloseButton: false,
        loading: false,
        color: 'transperant',
      });
    }
  };

  return (
    <Link href={`/lookbooks/result/${lookbook_id_a}/${lookbook_id_b}`}>
      <div className='flex flex-row border px-5 py-8 border-[#A41613] justify-between rounded-sm'>
        <Text size='md'>{vote_name}</Text>
        <ActionIcon variant='transparent' onClick={handleDelete}>
          <Trash className='text-black dark:text-white' size={24} />
        </ActionIcon>
      </div>
    </Link>
  );
};
