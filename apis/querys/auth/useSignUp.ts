import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/apis/actions/auth';

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}
