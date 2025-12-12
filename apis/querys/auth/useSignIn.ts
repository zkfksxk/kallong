import { useMutation } from '@tanstack/react-query';
import { signInWithPassword } from '@/apis/actions/auth';

export function useSignInWithPassword() {
  return useMutation({
    mutationFn: signInWithPassword,
  });
}
