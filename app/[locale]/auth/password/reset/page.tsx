'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Text, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useResetPassword } from '@/apis/querys/auth/useResetPassword';
import { Button, showNotification } from '@/components';
import { MailIcon } from '@/shared/common/icons';
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from '../../_constants/form';

export default function ResetPasswordPage() {
  const t = useTranslations();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onChange',
  });
  const { mutate: resetPassword } = useResetPassword(); //todo: 로그인 이후면 가입한 메일과 동일한지 확인

  const onSubmit = (data: { email: string }) => {
    resetPassword(data.email, {
      onSuccess: () => {
        reset();
        setIsSubmitted(true);

        showNotification({
          title: t('Common.succeed', { type: t('Auth.resetPassword.title') }),
          message: t('Auth.resetPassword.succeed'),
          type: 'success',
        });
      },
      onError: () => {
        showNotification({
          title: t('Common.fail', { type: t('Auth.resetPassword.title') }),
          message: t('Auth.resetPassword.fail'),
          type: 'fail',
        });
      },
    });
  };

  if (isSubmitted) {
    return (
      <Box
        bg='red.1'
        className='w-full flex flex-col items-center gap-3 p-5 rounded-sm'
      >
        <MailIcon size={30} />
        <Text ta='center' c='black' fw={700}>
          {t('Auth.resetPassword.checkEmail')}
        </Text>
      </Box>
    );
  }

  return (
    <div className='w-full flex flex-col'>
      <Text ta='center' size='2xl' fw={700}>
        {t('Auth.signIn.forgotPassword')}
      </Text>
      <Text ta='center' size='md'>
        {t('Auth.resetPassword.description')}
      </Text>
      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex flex-col mb-8'>
          <TextInput
            label={t('Auth.field.email')}
            type='email'
            {...register('email')}
            error={
              errors.email?.message
                ? t(errors.email.message as string)
                : undefined
            }
            disabled={isSubmitting}
          />
        </div>

        <Button
          type='submit'
          variant='secondary'
          fullWidth
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
        >
          {t('Auth.resetPassword.requestEmailButton')}
        </Button>
      </form>
    </div>
  );
}
