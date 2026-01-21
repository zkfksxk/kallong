import { useQuery } from '@tanstack/react-query';
import { OutfitRes, getDailyOutfit } from '@/apis/actions/outfit';
import queryKeys from '@/apis/queryKeys';

export function useGetDailyOutfit(id: string) {
  return useQuery<OutfitRes>({
    queryFn: () => getDailyOutfit(id),
    queryKey: [queryKeys.OUTFIT.GET_BYID(id)],
  });
}
