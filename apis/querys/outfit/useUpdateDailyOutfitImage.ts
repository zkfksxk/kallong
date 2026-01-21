import { useMutation } from '@tanstack/react-query';
import { upadateDailyOutfitImage } from '@/apis/actions/outfit';

export function useUpdateDailyOutfitImage() {
  return useMutation({
    mutationFn: upadateDailyOutfitImage,
  });
}
