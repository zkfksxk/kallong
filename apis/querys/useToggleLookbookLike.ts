import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type LookbookRes, toggleLookbookLike } from '../actions/lookbook';
import queryKeys from '../queryKeys';

export function useToggleLookbookLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleLookbookLike,
    onMutate: async (lookbook_id) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.lookbook.detail(lookbook_id),
      });
      await queryClient.cancelQueries({
        queryKey: queryKeys.lookbook.liked(lookbook_id),
      });

      const prevLookbook = queryClient.getQueryData<LookbookRes>([
        queryKeys.lookbook.detail(lookbook_id),
      ]);
      const prevLiked = queryClient.getQueryData<boolean>([
        queryKeys.lookbook.liked(lookbook_id),
      ]);

      queryClient.setQueryData(
        queryKeys.lookbook.liked(lookbook_id),
        !prevLiked
      );
      queryClient.setQueryData(
        queryKeys.lookbook.detail(lookbook_id),
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
        queryKey: queryKeys.lookbook.detail(lookbook_id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.lookbook.liked(lookbook_id),
      });
    },
    onError: (_, lookbook_id, context) => {
      if (!context) return;

      if (context.prevLookbook) {
        queryClient.setQueryData(
          queryKeys.lookbook.detail(lookbook_id),
          context.prevLookbook
        );
      }
      if (context.prevLiked !== undefined) {
        queryClient.setQueryData(
          queryKeys.lookbook.liked(lookbook_id),
          context.prevLiked
        );
      }
    },
  });
}
