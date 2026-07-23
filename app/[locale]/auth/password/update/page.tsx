'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Text, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useUpdatePassword } from '@/apis/querys/auth/useUpdatePassword';
import { Button, showNotification } from '@/components';
import { useRouter } from '@/i18n/navigation';
import {
  UpdatePasswordFormData,
  updatePasswordSchema,
} from '../../_constants/form';

export default function UpdatePasswordPage() {
  const t = useTranslations();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: '' },
    mode: 'onChange',
  });
  const { mutate: updatePassword } = useUpdatePassword();

  const onSubmit = (data: { password: string }) => {
    updatePassword(data.password, {
      onSuccess: () => {
        reset();
        router.push('/');
      },
      onError: () => {
        showNotification({
          title: t('Common.fail', {
            type: t('Auth.updatePassword.title'),
          }),
          message: t('Auth.updatePassword.fail'),
          type: 'fail',
        });
        reset();
      },
    });
  };

  return (
    <div className='w-full flex flex-col'>
      <Text ta='center' size='2xl' fw={700}>
        {t('Auth.updatePassword.title')}
      </Text>
      <Text ta='center' size='sm'>
        {t('Auth.updatePassword.description')}
      </Text>
      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex flex-col mb-8'>
          <TextInput
            label={t('Auth.field.newPassword')}
            type='password'
            description={t('Auth.passwordPolicy')}
            autoComplete='new-password'
            {...register('password')}
            error={
              errors.password?.message
                ? t(errors.password.message as string)
                : undefined
            }
            disabled={isSubmitting}
          />
        </div>
        <Button
          type='submit'
          variant='secondary'
          fullWidth
          disabled={!isValid || isSubmitting}
        >
          {t('Common.save')}
        </Button>
      </form>
    </div>
  );
}
