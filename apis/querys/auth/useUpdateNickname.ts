import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNickname } from '@/apis/actions/auth';
import queryKeys from '@/apis/queryKeys';

export const useUpdateNickname = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (nickname: string) => updateNickname(nickname),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.PROFILE.GET_BYID,
      });
    },
  });
};
