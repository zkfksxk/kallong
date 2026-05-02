import { useMutation } from '@tanstack/react-query';
import { upadateLookbook } from '@/apis/actions/lookbook';

export function useUpdateLookbook() {
  return useMutation({
    mutationFn: upadateLookbook,
  });
}
