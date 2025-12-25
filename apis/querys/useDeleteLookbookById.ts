import { useMutation } from '@tanstack/react-query';
import { deleteLookbookById } from '../actions/lookbook';

export function useDeleteLookbookById() {
  return useMutation({
    mutationFn: deleteLookbookById,
  });
}
