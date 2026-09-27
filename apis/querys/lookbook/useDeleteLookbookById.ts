import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLookbookById } from '@/apis/actions/lookbook';
import queryKeys from '@/apis/queryKeys';

export function useDeleteLookbookById() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLookbookById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.vote.lists(),
      });
    },
  });
}
