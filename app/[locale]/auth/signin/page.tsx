'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Text, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { CustomError } from '@/apis/error';
import { useSignInWithPassword } from '@/apis/querys/auth';
import { Button, showNotification } from '@/components';
import { Link, useRouter } from '@/i18n/navigation';
import { SignInFormData, signInSchema } from '../_constants/form';

export default function SignInPage() {
  const t = useTranslations();
  const router = useRouter();
  //const { isWebView } = useDetectWebView();
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
  // const { mutate: signInWithGoogle, isPending: signInWithGoogleIsPending } =
  //   useSignInWithGoogle();

  const onSubmit = (data: SignInFormData) => {
    signIn(data, {
      onSuccess: () => {
        router.push(`/`);
      },
      onError: (error) => {
        const errorObj = JSON.parse(error.message) as CustomError;
        const message = t(`auth.error.${errorObj.errorCode}`);

        showNotification({
          title: t('Common.fail', { type: t('Auth.signIn.title') }),
          message,
          type: 'fail',
        });
      },
    });
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     signInWithGoogle();
  //   } catch {
  //     showNotification({
  //       title: t('auth.signInFail'),
  //       message: t('auth.errors.googleSignInFailed'),
  //       type: 'fail',
  //     });
  //   }
  // };

  return (
    <div className='bg-white dark:bg-black w-full flex flex-col'>
      <Text ta='center' size='2xl' fw={700}>
        {t('Auth.signIn.title')}
      </Text>
      <form
        autoComplete='off'
        className='flex flex-col w-full'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-full flex flex-col gap-4 mb-8'>
          <TextInput
            label={t('Auth.field.email')}
            type='email'
            placeholder={t('Auth.placeholder', {
              field: `${t('Auth.field.email')}을`,
            })}
            autoComplete='off'
            {...register('email')}
            error={
              errors.email?.message
                ? t(errors.email.message as string)
                : undefined
            }
            disabled={signInIsPending}
          />
          <TextInput
            label={t('Auth.field.password')}
            type='password'
            placeholder={t('Auth.placeholder', {
              field: `${t('Auth.field.password')}을`,
            })}
            description={t('Auth.passwordPolicy')}
            autoComplete='new-password'
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
          {t('Auth.signIn.title')}
        </Button>
      </form>

      <div className='flex flex-row justify-end items-center mt-4 gap-2 text-md text-black dark:text-white'>
        <Link href='/auth/signup'>{t('Auth.signUp.title')}</Link>
        <div className='w-px h-4 bg-gray-300 dark:bg-gray-600' />
        <Link href='/auth/password/reset'>
          {t('Auth.signIn.forgotPassword')}
        </Link>
      </div>
      {/* {!isWebView && (
        <div className='flex flex-col w-full mt-20'>
          <Button
            icon={<GoogleIcon size={18} />}
            variant='secondary'
            fullWidth
            onClick={handleGoogleLogin}
            disabled={signInIsPending || signInWithGoogleIsPending}
          >
            Continue with Google
          </Button>
        </div>
      )} */}
    </div>
  );
}
