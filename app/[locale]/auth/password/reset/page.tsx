'use client';

import { Button, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { IoCheckmarkCircle as Check } from 'react-icons/io5';
import { IoCloseCircle as Close } from 'react-icons/io5';
import { useResetPassword } from '@/apis/querys/auth/useResetPassword';
import { AUTH_FORM_RULES } from '@/shared/common/constants';

export default function ResetPasswordPage() {
  const t = useTranslations('Mypage.auth');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{ email: string }>();
  const { mutate: resetPassword } = useResetPassword();

  const onSubmit = (data: { email: string }) => {
    resetPassword(data.email, {
      onSuccess: () => {
        reset();
        notifications.show({
          title: t('resetPassword'),
          message: t('resetPasswordSuccess'),
          icon: <Check color='blue' size={24} />,
          withCloseButton: false,
          loading: false,
          color: 'transperant',
        });
      },
      onError: () => {
        notifications.show({
          title: 'Password reset Failed',
          message: t('resetPasswordError'),
          icon: <Close color='red' size={24} />,
          withCloseButton: false,
          loading: false,
          color: 'transperant',
        });
      },
    });
  };

  return (
    <div className='w-full flex flex-col'>
      <Text ta='center'>비밀번호를 잊으셨나요?</Text>
      <Text ta='center' size='sm'>
        이메일로 비밀번호를 재설정 할 수 있는 인증 링크를 보내드립니다.
      </Text>
      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex flex-col gap-2 mb-8'>
          <TextInput
            {...register('email', AUTH_FORM_RULES.email)}
            label='이메일'
            type='email'
            placeholder='example@abc.com'
            error={errors.email?.message}
            disabled={isSubmitting}
          />
        </div>

        <Button
          type='submit'
          variant='filled'
          color='blue.9'
          size='lg'
          radius='md'
          disabled={isSubmitting}
        >
          인증 메일 요청하기
        </Button>
      </form>
    </div>
  );
}
