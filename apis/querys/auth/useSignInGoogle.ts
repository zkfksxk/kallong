import { useMutation } from '@tanstack/react-query';
import { signInWithGoogle } from '@/apis/actions/auth';

export function useSignInWithGoogle() {
  return useMutation({
    mutationFn: signInWithGoogle,
  });
}
