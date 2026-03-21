'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { IoCloseCircle as Close } from 'react-icons/io5';
import { CustomAuthError } from '@/apis/error';
import { useSignInWithPassword } from '@/apis/querys/auth/useSignIn';
import { useSignInWithGoogle } from '@/apis/querys/auth/useSignInGoogle';
import Button from '@/components/ui/button';
import { useDetectWebView } from '@/hooks/useDetectWebView';
import { Link, useRouter } from '@/i18n/navigation';
import { ICONS } from '@/shared/common/icons';
import { SignInFormData, signInSchema } from '../_constants/form';

export default function SignInPage() {
  const t = useTranslations('Setting');
  const router = useRouter();
  const { isWebView } = useDetectWebView();
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;
  const { mutate: signIn, isPending: signInIsPending } =
    useSignInWithPassword();
  const { mutate: signInWithGoogle, isPending: signInWithGoogleIsPending } =
    useSignInWithGoogle();

  const { Google } = ICONS;

  const onSubmit = (data: SignInFormData) => {
    signIn(data, {
      onSuccess: () => {
        router.push(`/`);
      },
      onError: (error) => {
        const errorObj = JSON.parse(error.message) as CustomAuthError;
        const message = t(`auth.error.${errorObj.code}`);

        notifications.show({
          title: t('auth.signInFail'),
          message,
          icon: <Close color='red' size={28} />,
          withCloseButton: false,
          loading: false,
          color: 'transperant',
        });
      },
    });
  };

  const handleGoogleLogin = async () => {
    try {
      signInWithGoogle();
    } catch {
      notifications.show({
        title: t('auth.signInFail'),
        message: t('auth.errors.googleSignInFailed'),
        icon: <Close color='red' size={28} />,
        withCloseButton: false,
        loading: false,
        color: 'transperant',
      });
    }
  };

  return (
    <div className='bg-white dark:bg-black w-full flex flex-col'>
      <Text ta='center' size='2xl' fw={700}>
        {t('auth.signIn')}
      </Text>
      <form
        autoComplete='off'
        className='flex flex-col w-full'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-full flex flex-col gap-4 mb-8'>
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
            disabled={signInIsPending}
          />
          <TextInput
            label={t('auth.password')}
            type='password'
            placeholder={t('auth.passwordPlaceholder')}
            description={t('auth.passwordDescription')}
            {...register('password')}
            error={
              errors.password?.message
                ? t(errors.password.message as string)
                : undefined
            }
            disabled={signInIsPending}
          />
        </div>
        <Button
          type='submit'
          variant='secondary'
          fullWidth
          disabled={!isValid || signInIsPending}
        >
          {t('auth.signIn')}
        </Button>
      </form>

      <div className='flex flex-row justify-end items-center mt-4 gap-2 text-md text-black dark:text-white'>
        <Link href='/auth/signup'>{t('auth.noAccount')}</Link>
        <div className='w-px h-4 bg-gray-300 dark:bg-gray-600' />
        <Link href='/auth/password/reset'>{t('auth.forgotPassword')}</Link>
      </div>
      {!isWebView && (
        <div className='flex flex-col w-full mt-20'>
          <Button
            icon={<Google size={18} />}
            variant='secondary'
            fullWidth
            onClick={handleGoogleLogin}
            disabled={signInIsPending || signInWithGoogleIsPending}
          >
            Continue with Google
          </Button>
        </div>
      )}
    </div>
  );
}
