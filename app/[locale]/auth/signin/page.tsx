'use client';

import { Button, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { IoCloseCircle as Close } from 'react-icons/io5';
import { CustomAuthError } from '@/apis/error';
//import { FcGoogle as Google } from 'react-icons/fc';
import { useSignInWithPassword } from '@/apis/querys/auth/useSignIn';
//import { useSignInWithGoogle } from '@/apis/querys/auth/useSignInGoogle';
import { Link, useRouter } from '@/i18n/navigation';
import { AUTH_FORM_RULES } from '@/shared/common/constants';
import { ICONS } from '@/shared/common/icons';
import { SignInForm } from '@/shared/common/types';

export default function SignInPage() {
  const t = useTranslations('Setting');
  const router = useRouter();
  const methods = useForm<SignInForm>();
  const { mutate: signIn, isPending: signInIsPending } =
    useSignInWithPassword();
  //const { mutate: signInWithGoogle, isPending: signInWithGoogleIsPending } = useSignInWithGoogle();

  const { RightSquare } = ICONS;

  const onSubmit = (data: SignInForm) => {
    signIn(data, {
      onSuccess: () => {
        router.push(`/`);
      },
      onError: (error) => {
        const errorObj = JSON.parse(error.message) as CustomAuthError;
        notifications.show({
          title: t('auth.failSignIn'),
          message: errorObj.message,
          icon: <Close color='red' size={24} />,
          withCloseButton: false,
          loading: false,
          color: 'transperant',
        });
      },
    });
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     signInWithGoogle();
  //   } catch (error) {
  //     console.error('Error logging in with Google:', error);
  //   }
  // };

  return (
    <div className='bg-white dark:bg-black w-full flex flex-col'>
      <Text ta='center' size='xl' fw={700}>
        {t('auth.signIn')}
      </Text>
      <form
        className='flex flex-col w-full'
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='w-full flex flex-col gap-2 mb-8'>
          <TextInput
            label={t('auth.email')}
            type='email'
            placeholder={t('auth.emailPlaceholder')}
            {...methods.register('email', {
              required: t('validation.emailRequired'),
              pattern: {
                value: AUTH_FORM_RULES.email.pattern.value,
                message: t('validation.emailInvalidPattern'),
              },
            })}
            error={methods.formState.errors.email?.message}
            disabled={signInIsPending}
          />
          <TextInput
            label={t('auth.password')}
            type='password'
            placeholder={t('auth.passwordPlaceholder')}
            description={t('auth.passwordRequirements')}
            {...methods.register('password', {
              required: t('validation.passwordRequired'),
              pattern: {
                value: AUTH_FORM_RULES.password.pattern.value,
                message: t('validation.passwordInvaildPattern'),
              },
              minLength: {
                value: AUTH_FORM_RULES.password.minLength.value,
                message: t('validation.passwordMin'),
              },
              maxLength: {
                value: AUTH_FORM_RULES.password.maxLength.value,
                message: t('validation.passwordMax'),
              },
            })}
            error={methods.formState.errors.password?.message}
            disabled={signInIsPending}
          />
        </div>
        <Button
          type='submit'
          variant='filled'
          size='lg'
          radius='md'
          disabled={signInIsPending}
        >
          {t('auth.signIn')}
        </Button>
      </form>

      <div className='flex flex-col mt-8 gap-5'>
        {/* <Button
          leftSection={<Google size={14} />}
          variant='outline'
          size='lg'
          radius='md'
          color='black'
          onClick={handleGoogleLogin}
          disabled={signInIsPending || signInWithGoogleIsPending}
        >
          Continue with Google
        </Button> */}
        <div className='flex flex-col gap-1 text-black dark:text-white'>
          <Link href='/auth/signup'>
            {t('auth.noAccount')} <RightSquare className='inline mx-1' />
            {t('auth.signUp')}
          </Link>
          <Link href='/auth/password/reset'>{t('auth.forgotPassword')}</Link>
        </div>
      </div>
    </div>
  );
}
