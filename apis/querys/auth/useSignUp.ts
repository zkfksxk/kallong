import { useMutation } from '@tanstack/react-query';
import { handleAuthErrorMessage } from '@/apis/AxiosObj';
import { signUp } from '@/apis/actions/auth';

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      const message = handleAuthErrorMessage(error);
      alert(message);
    },
  });
}
