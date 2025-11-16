import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type LookbookRes, toggleLookbookLike } from '../actions/lookbook';
import queryKeys from '../queryKeys';

export function useToggleLookbookLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleLookbookLike,
    onMutate: async (lookbook_id) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.GET_LOOKBOOK(lookbook_id)],
      });
      await queryClient.cancelQueries({
        queryKey: [queryKeys.CHECK_LOOKBOOK_LIKED(lookbook_id)],
      });

      const prevLookbook = queryClient.getQueryData<LookbookRes>([
        queryKeys.GET_LOOKBOOK(lookbook_id),
      ]);
      const prevLiked = queryClient.getQueryData<boolean>([
        queryKeys.CHECK_LOOKBOOK_LIKED(lookbook_id),
      ]);

      queryClient.setQueryData(
        [queryKeys.CHECK_LOOKBOOK_LIKED(lookbook_id)],
        !prevLiked
      );
      queryClient.setQueryData(
        [queryKeys.GET_LOOKBOOK(lookbook_id)],
        (old: LookbookRes | undefined) => {
          if (!old) return old;

          return {
            ...old,
            votes: prevLiked ? old.votes - 1 : old.votes + 1,
          };
        }
      );

      return {
        prevLookbook,
        prevLiked,
      };
    },
    onSuccess: (_, lookbook_id) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_LOOKBOOK(lookbook_id)],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.CHECK_LOOKBOOK_LIKED(lookbook_id)],
      });
    },
    onError: (_, lookbook_id, context) => {
      if (!context) return;

      if (context.prevLookbook) {
        queryClient.setQueryData(
          [queryKeys.GET_LOOKBOOK(lookbook_id)],
          context.prevLookbook
        );
      }
      if (context.prevLiked !== undefined) {
        queryClient.setQueryData(
          [queryKeys.CHECK_LOOKBOOK_LIKED(lookbook_id)],
          context.prevLiked
        );
      }
    },
  });
}
