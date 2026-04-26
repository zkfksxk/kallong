import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/apis/actions/auth';
import queryKeys from '@/apis/queryKeys';

export function useGetProfile(userId: string) {
  return useQuery({
    queryFn: () => getProfile(userId),
    queryKey: queryKeys.profile.detail(userId),
    enabled: !!userId,
  });
}
