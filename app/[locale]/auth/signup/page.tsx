'use client';

import { Button, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { IoCloseCircle as Close } from 'react-icons/io5';
import { useSignUp } from '@/apis/querys/auth/useSignUp';
import { Link, useRouter } from '@/i18n/navigation';
import { AUTH_FORM_RULES } from '@/shared/common/constants';
import { SignUpForm } from '@/shared/common/types';

export default function SignUpPage() {
  const t = useTranslations('Mypage.auth');
  const router = useRouter();
  const methods = useForm<SignUpForm>();
  const { mutate: signUp, isPending } = useSignUp();

  const onSubmit = (data: SignUpForm) => {
    signUp(data, {
      onSuccess: () => {
        router.push('/auth/signin');
      },
      onError: (error) => {
        console.log(error);
        notifications.show({
          title: 'SignUp Failed',
          message: t('failSignUp'),
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
      <Text ta='center' size='xl' fw='700'>
        {t('signUp')}
      </Text>

      <form
        className='flex flex-col w-full'
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='w-full flex flex-col gap-4 mb-8'>
          <TextInput
            label={t('email')}
            type='email'
            placeholder={t('emailPlaceholder')}
            {...methods.register('email', AUTH_FORM_RULES.email)}
            error={methods.formState.errors.email?.message}
            disabled={isPending}
          />
          <TextInput
            label={t('password')}
            type='password'
            placeholder={t('passwordPlaceholder')}
            description={t('passwordRequirements')}
            {...methods.register('password', AUTH_FORM_RULES.password)}
            error={methods.formState.errors.password?.message}
            disabled={isPending}
          />
          <TextInput
            label={t('nickname')}
            type='text'
            placeholder={t('nicknamePlaceholder')}
            {...methods.register('nickname', AUTH_FORM_RULES.nickname)}
            error={methods.formState.errors.nickname?.message}
            disabled={isPending}
          />
        </div>
        <Button
          type='submit'
          variant='filled'
          color='blue.9'
          size='lg'
          radius='md'
          disabled={isPending}
        >
          {t('signUp')}
        </Button>
      </form>

      <Link href='/mypage/signin' className='mt-5'>
        이미 계정이 있다면? ➡️ 로그인
      </Link>
    </div>
  );
}
