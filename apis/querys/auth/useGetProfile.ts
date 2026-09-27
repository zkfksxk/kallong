import { skipToken, useQuery } from '@tanstack/react-query';
import { getProfile } from '@/apis/actions/auth';
import queryKeys from '@/apis/queryKeys';

export function useGetProfile(userId: string) {
  return useQuery({
    queryFn: userId ? () => getProfile(userId) : skipToken,
    queryKey: queryKeys.profile.detail(userId),
  });
}
