import { useMutation } from '@tanstack/react-query';
import { axiosObj } from '@/apis/AxiosObj';
import { useRouter } from '@/i18n/navigation';

export const deleteAccount = async (userId: string) => {
  const response = await axiosObj.post('/api/auth/delete-user', {
    user_id: userId,
  });

  return response.data;
};

export const useDeleteAccount = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: async () => {
      router.push('/');
    },
  });
};
