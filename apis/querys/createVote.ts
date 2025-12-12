import { useMutation } from '@tanstack/react-query';
import { createVote } from '../actions/lookbook';

export function useCreateVote() {
  return useMutation({
    mutationFn: createVote,
  });
}
