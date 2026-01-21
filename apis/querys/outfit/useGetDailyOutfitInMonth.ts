import { useQuery } from '@tanstack/react-query';
import { getDailyOutfitInMonth } from '@/apis/actions/outfit';
import queryKeys from '@/apis/queryKeys';

export function useGetDailyOutfitInMonth(currentDay: Date) {
  const year = currentDay.getFullYear();
  const month = currentDay.getMonth() + 1;

  return useQuery({
    queryFn: () => getDailyOutfitInMonth({ year, month }),
    queryKey: [queryKeys.OUTFIT.MONTH],
  });
}
