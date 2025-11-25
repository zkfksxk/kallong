import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/apis/actions/auth';
import queryKeys from '@/apis/queryKeys';

export function useGetUser() {
  return useQuery({
    queryFn: getUser,
    queryKey: [queryKeys.GET_USER],
  });
}
