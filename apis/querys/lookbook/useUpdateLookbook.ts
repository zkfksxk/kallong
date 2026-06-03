import { useMutation } from '@tanstack/react-query';
import { updateLookbook } from '@/apis/actions/lookbook';

export function useUpdateLookbook() {
  return useMutation({
    mutationFn: updateLookbook,
  });
}
