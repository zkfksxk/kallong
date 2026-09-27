import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDailyOutfit } from '@/apis/actions/outfit';
import queryKeys from '@/apis/queryKeys';

export function useUpdateDailyOutfit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDailyOutfit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.outfit.details(),
      });
    },
  });
}
