import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { getDailyOutfitInMonth } from '@/apis/actions/outfit';
import queryKeys from '@/apis/queryKeys';

export function useGetDailyOutfitInMonth(currentDay: Date) {
  const yearMonth = dayjs(currentDay).format('YYYY-MM');

  return useQuery({
    queryFn: () => getDailyOutfitInMonth(yearMonth),
    queryKey: [
      queryKeys.OUTFIT.IN_MONTH(dayjs(currentDay).format('YYYY-MM-DD')),
    ],
  });
}
