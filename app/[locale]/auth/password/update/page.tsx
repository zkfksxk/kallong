'use client';

import { Button, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { IoCloseCircle as Close } from 'react-icons/io5';
import { CustomAuthError } from '@/apis/error';
import { useUpdatePassword } from '@/apis/querys/auth/useUpdatePassword';
import { useRouter } from '@/i18n/navigation';
import { AUTH_FORM_RULES } from '@/shared/common/constants';

export default function UpdatePasswordPage() {
  const t = useTranslations('Setting.auth');
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
          title: t('failPasswordUpdate'),
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
      <Text ta='center'>{t('updatePassword')}</Text>
      <Text ta='center' size='sm'>
        {t('updatePasswordDescription')}
      </Text>
      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex flex-col gap-8'>
          <TextInput
            {...register('password', AUTH_FORM_RULES.password)}
            label={t('newPassword')}
            type='password'
            description={t('passwordRequirements')}
            error={errors.password?.message}
            disabled={isSubmitting}
          />
          <Button
            type='submit'
            variant='filled'
            color='black'
            size='lg'
            radius='md'
            disabled={isSubmitting}
          >
            {t('saveButton')}
          </Button>
        </div>
      </form>
    </div>
  );
}
