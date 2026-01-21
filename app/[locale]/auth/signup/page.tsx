'use client';

import { Button, Checkbox, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { IoCloseCircle as Close } from 'react-icons/io5';
import { CustomAuthError } from '@/apis/error';
import { useSignUp } from '@/apis/querys/auth/useSignUp';
import { Link, useRouter } from '@/i18n/navigation';
import { AUTH_FORM_RULES } from '@/shared/common/constants';
import { ICONS } from '@/shared/common/icons';
import { SignUpForm } from '@/shared/common/types';

export default function SignUpPage() {
  const t = useTranslations('Setting.auth');
  const router = useRouter();
  const methods = useForm<SignUpForm>({
    defaultValues: {
      termsOfService: false,
      privacyPolicy: false,
    },
  });
  const { mutate: signUp, isPending } = useSignUp();

  const onSubmit = (data: SignUpForm) => {
    console.log('signup');
    if (!data.termsOfService || !data.privacyPolicy) {
      notifications.show({
        title: t('failSignUp'),
        message: '이용 약관에 동의해주세요.',
        icon: <Close color='red' size={24} />,
        withCloseButton: false,
        loading: false,
        color: 'transperant',
      });
      return;
    }

    signUp(
      { email: data.email, password: data.password, nickname: data.nickname },
      {
        onSuccess: () => {
          router.push('/auth/signin');
        },
        onError: (error) => {
          const errorObj = JSON.parse(error.message) as CustomAuthError;
          notifications.show({
            title: t('failSignUp'),
            message: errorObj.message,
            icon: <Close color='red' size={24} />,
            withCloseButton: false,
            loading: false,
            color: 'transperant',
          });
        },
      }
    );
  };

  const password = methods.watch('password');
  const { RightSquare, Forward } = ICONS;

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
            label={t('passwordConfirmed')}
            type='password'
            placeholder={t('passwordConfirmedPlaceholder')}
            {...methods.register('passwordConfirmed', {
              required: t('passwordConfirmedRequirements'),
              validate: (value) => value === password || t('passwordMismatch'),
            })}
            error={methods.formState.errors.passwordConfirmed?.message}
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
          <div className='flex flex-row flex-1 justify-between'>
            <Checkbox
              label='서비스 이용약관'
              {...methods.register('termsOfService')}
            />
            <Link
              href='https://busy-screw-956.notion.site/Kallong-2ced82040c488001b27bdce25e66fae7?source=copy_link'
              className='inline-flex items-center gap-1'
            >
              <Text span>보기</Text>
              <Forward color='black' size={24} />
            </Link>
          </div>
          <div className='flex flex-row flex-1 justify-between'>
            <Checkbox
              label='개인정보 수집 및 이용 동의'
              {...methods.register('privacyPolicy')}
            />
            <Link
              href='https://busy-screw-956.notion.site/Kallong-2ced82040c488099a766fb47ab9ae793?source=copy_link'
              className='inline-flex items-center gap-1'
            >
              <Text span>보기</Text>
              <Forward color='black' size={24} />
            </Link>
          </div>
        </div>

        <Button
          type='submit'
          variant='filled'
          color='black'
          size='lg'
          radius='md'
          disabled={isPending}
        >
          {t('signUp')}
        </Button>
      </form>

      <Link href='/mypage/signin' className='mt-5'>
        {t('alreadyHaveAccount')} <RightSquare className='inline' />
        {t('signIn')}
      </Link>
    </div>
  );
}
