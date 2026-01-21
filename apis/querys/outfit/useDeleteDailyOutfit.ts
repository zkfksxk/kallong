import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDailyOutfit } from '@/apis/actions/outfit';
import queryKeys from '@/apis/queryKeys';

export function useDeleteDailyOutfit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDailyOutfit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.OUTFIT.MONTH],
      });
    },
  });
}
