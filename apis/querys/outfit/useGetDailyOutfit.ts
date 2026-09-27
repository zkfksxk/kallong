import { skipToken, useQuery } from '@tanstack/react-query';
import { getDailyOutfit } from '@/apis/actions/outfit';
import queryKeys from '@/apis/queryKeys';
import { type OutfitDetail } from '@/apis/types/outfit';

export function useGetDailyOutfit(id?: string) {
  return useQuery<OutfitDetail | null>({
    queryFn: id ? () => getDailyOutfit(id) : skipToken,
    queryKey: queryKeys.outfit.detail(id!),
  });
}
