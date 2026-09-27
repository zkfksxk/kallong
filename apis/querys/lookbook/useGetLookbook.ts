import { skipToken, useQuery } from '@tanstack/react-query';
import { getLookbook } from '@/apis/actions/lookbook';
import queryKeys from '@/apis/queryKeys';
import { LookbookDetail } from '@/apis/types/lookbook';

export function useGetLookbook(id?: string) {
  return useQuery<LookbookDetail | null>({
    queryFn: id ? () => getLookbook(id) : skipToken,
    queryKey: queryKeys.lookbook.detail(id!),
  });
}
