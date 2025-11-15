import { useQuery } from '@tanstack/react-query';
import { getLookbook } from '../actions/lookbook';
import queryKeys from '../queryKeys';

export function useGetLookbook(id: string) {
  return useQuery({
    queryFn: () => getLookbook(id),
    queryKey: [queryKeys.GET_LOOKBOOK(id)],
    enabled: !!id,
  });
}
