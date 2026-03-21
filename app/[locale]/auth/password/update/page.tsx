'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { IoCloseCircle as Close } from 'react-icons/io5';
import { useUpdatePassword } from '@/apis/querys/auth/useUpdatePassword';
import Button from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import {
  UpdatePasswordFormData,
  updatePasswordSchema,
} from '../../_constants/form';

export default function UpdatePasswordPage() {
  const t = useTranslations('Setting');
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
        notifications.show({
          title: t('auth.passwordUpdate'),
          message: t('auth.passwordUpdateFail'),
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
      <Text ta='center' size='2xl' fw={700}>
        {t('auth.updatePassword')}
      </Text>
      <Text ta='center' size='sm'>
        {t('auth.updatePasswordDescription')}
      </Text>
      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex flex-col mb-8'>
          <TextInput
            label={t('auth.newPassword')}
            type='password'
            placeholder={t('auth.passwordPlaceholder')}
            description={t('auth.passwordDescription')}
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
          {t('auth.saveButton')}
        </Button>
      </form>
    </div>
  );
}
