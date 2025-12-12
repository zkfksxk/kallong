import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '@/apis/actions/auth';

export function useUpdatePassword() {
  return useMutation({
    mutationFn: updatePassword,
  });
}
