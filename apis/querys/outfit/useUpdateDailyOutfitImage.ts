import { useMutation } from '@tanstack/react-query';
import { updateDailyOutfitImage } from '@/apis/actions/outfit';

export function useUpdateDailyOutfitImage() {
  return useMutation({
    mutationFn: updateDailyOutfitImage,
  });
}
