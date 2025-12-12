import { useMutation } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { resetPasswordForEmail } from '@/apis/actions/auth';

export function useResetPassword() {
  const locale = useLocale();

  return useMutation({
    mutationFn: (email: string) => resetPasswordForEmail(email, locale),
  });
}
