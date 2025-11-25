import { useMutation } from '@tanstack/react-query';
import { resetPasswordForEmail } from '@/apis/actions/auth';

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPasswordForEmail,
  });
}
