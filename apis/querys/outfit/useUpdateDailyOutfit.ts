import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upadateDailyOutfit } from '@/apis/actions/outfit';
import queryKeys from '@/apis/queryKeys';

export function useUpdateDailyOutfit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upadateDailyOutfit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.OUTFIT.MONTH],
      });
    },
  });
}
