import { useQuery } from '@tanstack/react-query';
import { checkLookbookLiked } from '@/apis/actions/lookbook';
import queryKeys from '@/apis/queryKeys';

export function useCheckLookbookLiked(lookbook_id: string) {
  return useQuery({
    queryFn: () => checkLookbookLiked(lookbook_id),
    queryKey: queryKeys.lookbook.liked(lookbook_id),
  });
}
