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
    onError: (error) => {
      console.error('회원탈퇴', error);
      alert('회원탈퇴 중 오류가 발생했습니다.');
    },
  });
};
