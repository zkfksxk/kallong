import { useMutation } from '@tanstack/react-query';
import { createPostWithImages } from '../actions/lookbook';

export function useCreateLookbook() {
  return useMutation({
    mutationFn: createPostWithImages,
  });
}
