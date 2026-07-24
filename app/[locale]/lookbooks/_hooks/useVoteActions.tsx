import { useTranslations } from 'next-intl';
import { useCheckLookbookLiked, useToggleLookbookLike } from '@/apis/querys';
import { showNotification } from '@/components/ui';

export function useVoteActions(
  firstId: string,
  secondId: string,
  remainingTime: string
) {
  const t = useTranslations();
  const { mutate: toggleMutate } = useToggleLookbookLike();
  const { data: isFirstLookbookLiked } = useCheckLookbookLiked(firstId);
  const { data: isSecondLookbookLiked } = useCheckLookbookLiked(secondId);

  const handleToggle = (lookbookId: string) => {
    if (remainingTime === '00:00') {
      showNotification({
        title: t('Common.fail', { type: t('Lookbook.title') }),
        message: t('Lookbook.error.voteEnded'),
        type: 'fail',
      });
      return;
    }

    toggleMutate(lookbookId, {
      onError: () => {
        showNotification({
          title: t('Common.fail', { type: t('Lookbook.title') }),
          message: t('Lookbook.error.likeFailed'),
          type: 'fail',
        });
      },
    });
  };

  return {
    isFirstLookbookLiked: isFirstLookbookLiked ?? false,
    isSecondLookbookLiked: isSecondLookbookLiked ?? false,
    handleToggle,
  };
}
