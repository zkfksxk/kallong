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
  const t = useTranslations('Mypage.auth');
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
          title: 'SignIn Failed',
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
    <div className='w-full flex flex-col'>
      <Text ta='center' size='xl' fw='700'>
        로그인
      </Text>
      <form
        className='flex flex-col w-full'
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='w-full flex flex-col gap-2 mb-8'>
          <TextInput
            label='이메일'
            type='email'
            placeholder={t('emailPlaceholder')}
            {...methods.register('email', AUTH_FORM_RULES.email)}
            error={methods.formState.errors.email?.message}
            disabled={signInIsPending}
          />
          <TextInput
            label='비밀번호'
            type='password'
            placeholder={t('passwordPlaceholder')}
            description={t('passwordRequirements')}
            {...methods.register('password', AUTH_FORM_RULES.password)}
            error={methods.formState.errors.password?.message}
            disabled={signInIsPending}
          />
        </div>
        <Button
          type='submit'
          variant='filled'
          color='black'
          size='lg'
          radius='md'
          disabled={signInIsPending}
        >
          로그인
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
        <div className='flex flex-col gap-1'>
          <Link href='/auth/signup'>
            계정이 없다면? <RightSquare className='inline' /> 회원가입
          </Link>
          <Link href='/auth/password/reset'>비밀번호를 잊으셨나요?</Link>
        </div>
      </div>
    </div>
  );
}
