import { ActionIcon, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useDeleteLookbookById } from '@/apis/querys';
import { showNotification } from '@/components/ui';
import { Link } from '@/i18n/navigation';
import { TrashIcon } from '@/shared/common/icons';

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
      <div className='flex flex-row border px-5 py-8 border-[#A41613] justify-between rounded-sm'>
        <Text size='md'>{vote_name}</Text>
        <ActionIcon variant='transparent' onClick={handleDelete}>
          <TrashIcon className='text-black dark:text-white' size={24} />
        </ActionIcon>
      </div>
    </Link>
  );
};
