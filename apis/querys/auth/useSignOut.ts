import { useMutation } from '@tanstack/react-query';
import { signOut } from '@/apis/actions/auth';

export function useSignOut() {
  return useMutation({
    mutationFn: signOut,
  });
}
