import { useMutation } from '@tanstack/react-query';
import { deleteLookbookById } from '@/apis/actions/lookbook';

export function useDeleteLookbookById() {
  return useMutation({
    mutationFn: deleteLookbookById,
  });
}
