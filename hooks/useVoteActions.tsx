// hooks/useVoteActions.ts
import { notifications } from '@mantine/notifications';
import { useCheckLookbookLiked } from '@/apis/querys/useCheckLookbookLiked';
import { useToggleLookbookLike } from '@/apis/querys/useToggleLookbookLike';
import { ICONS } from '@/shared/common/icons';

const { Alert } = ICONS;

export function useVoteActions(
  firstId: string,
  secondId: string,
  remainingTime: string
) {
  const { mutate: toggleMutate } = useToggleLookbookLike();
  const { data: isFirstLookbookLiked } = useCheckLookbookLiked(firstId);
  const { data: isSecondLookbookLiked } = useCheckLookbookLiked(secondId);

  const handleToggle = (lookbookId: string) => {
    if (remainingTime === '00:00') {
      notifications.show({
        title: 'Vote Failed',
        message: '이미 투표 시간이 종료되었습니다.',
        icon: <Alert.Close color='red' size={24} />,
        loading: false,
      });
      return;
    }

    toggleMutate(lookbookId, {
      onError: () => {
        notifications.show({
          title: 'Like Failed',
          message: '좋아요 처리에 실패했습니다. 다시 시도해 주세요.',
          icon: <Alert.Close color='red' size={24} />,
          loading: false,
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
