import { useMutation } from '@tanstack/react-query';
import { createVote } from '@/apis/actions/lookbook';

export function useCreateVote() {
  return useMutation({
    mutationFn: createVote,
  });
}
