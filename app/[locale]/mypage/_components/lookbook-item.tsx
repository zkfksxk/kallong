import { ActionIcon, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useDeleteLookbookById } from '@/apis/querys';
import { showNotification } from '@/components/ui';
import { Link } from '@/i18n/navigation';
import { TrashIcon } from '@/shared/common/icons';

type Props = {
  vote_name: string;
  created_at: string;
  lookbook_id_a: string;
  lookbook_id_b: string;
};

export const LookbookItem = ({
  vote_name,
  created_at,
  lookbook_id_a,
  lookbook_id_b,
}: Props) => {
  const t = useTranslations();
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
      showNotification({
        title: t('Common.fail', { type: t('MyPage.lookbook.title') }),
        message: t('MyPage.error.lookbookDeleteFailed'),
        type: 'fail',
      });
    }
  };

  return (
    <Link href={`/lookbooks/result/${lookbook_id_a}/${lookbook_id_b}`}>
      <div className='flex flex-row border p-5 border-[#A41613] justify-between rounded-sm'>
        <div className='flex flex-col gap-1'>
          <Text size='md'>{vote_name}</Text>
          <Text size='sm'>{dayjs(created_at).format('YYYY.MM.DD')}</Text>
        </div>
        <ActionIcon variant='transparent' onClick={handleDelete}>
          <TrashIcon className='text-black dark:text-white' size={18} />
        </ActionIcon>
      </div>
    </Link>
  );
};
