import { useMutation } from '@tanstack/react-query';
import { upadateLookbook } from '../actions/lookbook';

export function useUpdateLookbook() {
  return useMutation({
    mutationFn: upadateLookbook,
  });
}
