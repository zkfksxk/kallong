'use client';

import { Button, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from 'react-hook-form';
import { IoCloseCircle as Close } from 'react-icons/io5';
import { CustomAuthError } from '@/apis/error';
import { useUpdatePassword } from '@/apis/querys/auth/useUpdatePassword';
import { useRouter } from '@/i18n/navigation';
import { AUTH_FORM_RULES } from '@/shared/common/constants';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{ password: string }>();
  const { mutate: updatePassword } = useUpdatePassword();

  const onSubmit = (data: { password: string }) => {
    updatePassword(data.password, {
      onSuccess: () => {
        reset();
        router.push('/');
      },
      onError: (error) => {
        const errorObj = JSON.parse(error.message) as CustomAuthError;
        notifications.show({
          title: 'Password update Failed',
          message: errorObj.message,
          icon: <Close color='red' size={24} />,
          withCloseButton: false,
          loading: false,
          color: 'transperant',
        });
        reset();
      },
    });
  };

  return (
    <div className='w-full flex flex-col'>
      <Text ta='center'>비밀번호 재설정하기</Text>
      <Text ta='center' size='sm'>
        새로운 비밀번호를 입력하세요
      </Text>
      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex flex-col gap-2 mb-8'>
          <TextInput
            {...register('password', AUTH_FORM_RULES.password)}
            label='비밀번호'
            type='password'
            error={errors.password?.message}
            disabled={isSubmitting}
          />
          <Button
            type='submit'
            variant='filled'
            color='blue.9'
            size='lg'
            radius='md'
            disabled={isSubmitting}
          >
            비밀번호 변경하기
          </Button>
        </div>
      </form>
    </div>
  );
}
