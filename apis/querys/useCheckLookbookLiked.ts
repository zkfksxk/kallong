import { useQuery } from '@tanstack/react-query';
import { checkLookbookLiked } from '../actions/lookbook';
import queryKeys from '../queryKeys';

export function useCheckLookbookLiked(lookbook_id: string) {
  return useQuery({
    queryFn: () => checkLookbookLiked(lookbook_id),
    queryKey: [queryKeys.LOOKBOOK_LIKED(lookbook_id)],
  });
}
