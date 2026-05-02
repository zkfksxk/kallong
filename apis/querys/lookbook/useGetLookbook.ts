import { useQuery } from '@tanstack/react-query';
import { getLookbook } from '@/apis/actions/lookbook';
import queryKeys from '@/apis/queryKeys';

export function useGetLookbook(id: string) {
  return useQuery({
    queryFn: () => getLookbook(id),
    queryKey: queryKeys.lookbook.detail(id),
    enabled: !!id,
  });
}
