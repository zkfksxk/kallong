import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLookbookLike } from '../actions/lookbook';
import queryKeys from '../queryKeys';

export function useToggleLookbookLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleLookbookLike,
    onSuccess: (_, lookbook_id) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_LOOKBOOK(lookbook_id)],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.LOOKBOOK_LIKED(lookbook_id)],
      });
    },
  });
}
