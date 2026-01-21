import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDailyOutfit } from '@/apis/actions/outfit';
import queryKeys from '@/apis/queryKeys';

export function useCreatDailyOutfit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDailyOutfit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.OUTFIT.MONTH],
      });
    },
  });
}
