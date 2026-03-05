'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useResetPassword } from '@/apis/querys/auth/useResetPassword';
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from '@/shared/common/constants/form';
import { ICONS } from '@/shared/common/icons';

export default function ResetPasswordPage() {
  const t = useTranslations('Setting');
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
  const { Alert, Mail } = ICONS;

  const onSubmit = (data: { email: string }) => {
    resetPassword(data.email, {
      onSuccess: () => {
        reset();
        setIsSubmitted(true);
        notifications.show({
          title: t('auth.resetPassword'),
          message: t('auth.resetPasswordSucceed'),
          icon: <Alert.Check color='blue' size={24} />,
          withCloseButton: false,
          loading: false,
          color: 'transperant',
        });
      },
      onError: () => {
        notifications.show({
          title: t('auth.resetPassword'),
          message: t('auth.resetPasswordFail'),
          icon: <Alert.Close color='red' size={24} />,
          withCloseButton: false,
          loading: false,
          color: 'transperant',
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
        <Mail size={30} />
        <Text ta='center' c='black' fw={700}>
          {t('auth.checkEmail')}
        </Text>
      </Box>
    );
  }

  return (
    <div className='w-full flex flex-col'>
      <Text ta='center' size='2xl' fw={700}>
        {t('auth.forgotPassword')}
      </Text>
      <Text ta='center' size='md'>
        {t('auth.resetPasswordDescription')}
      </Text>
      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex flex-col mb-8'>
          <TextInput
            label={t('auth.email')}
            type='email'
            placeholder={t('auth.emailPlaceholder')}
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
          variant='filled'
          size='lg'
          radius='md'
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
        >
          {t('auth.resetEmailButton')}
        </Button>
      </form>
    </div>
  );
}
