import { useMutation } from '@tanstack/react-query';
import { createLookbook } from '../actions/lookbook';

export function useCreateLookbook() {
  return useMutation({
    mutationFn: createLookbook,
  });
}
