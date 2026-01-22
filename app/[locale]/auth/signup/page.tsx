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
  const t = useTranslations('Setting');
  const router = useRouter();
  const methods = useForm<SignUpForm>({
    defaultValues: {
      termsOfService: false,
      privacyPolicy: false,
    },
  });
  const { mutate: signUp, isPending } = useSignUp();

  const onSubmit = (data: SignUpForm) => {
    if (!data.termsOfService || !data.privacyPolicy) {
      notifications.show({
        title: t('auth.failSignUp'),
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
            title: t('auth.failSignUp'),
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
      <Text ta='center' size='xl' fw={700}>
        {t('auth.signUp')}
      </Text>

      <form
        className='flex flex-col w-full'
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='w-full flex flex-col gap-4 mb-8'>
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
            disabled={isPending}
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
            disabled={isPending}
          />
          <TextInput
            label={t('auth.passwordConfirmed')}
            type='password'
            placeholder={t('auth.passwordConfirmedPlaceholder')}
            {...methods.register('passwordConfirmed', {
              required: t('validation.passwordConfirmedRequired'),
              validate: (value) =>
                value === password || t('validation.passwordMismatch'),
            })}
            error={methods.formState.errors.passwordConfirmed?.message}
            disabled={isPending}
          />
          <TextInput
            label={t('auth.nickname')}
            type='text'
            placeholder={t('auth.nicknamePlaceholder')}
            {...methods.register('nickname', {
              required: t('validation.nicknameRequired'),
              minLength: {
                value: AUTH_FORM_RULES.nickname.minLength.value,
                message: t('validation.nicknameMin'),
              },
              maxLength: {
                value: AUTH_FORM_RULES.nickname.maxLength.value,
                message: t('validation.nicknameMax'),
              },
              pattern: {
                value: AUTH_FORM_RULES.nickname.pattern.value,
                message: t('validation.nicknamInvalidPattern'),
              },
            })}
            error={methods.formState.errors.nickname?.message}
            disabled={isPending}
          />
          <div className='flex flex-row flex-1 justify-between'>
            <Checkbox
              label={t('auth.termsOfService')}
              {...methods.register('termsOfService')}
            />
            <Link
              href='https://busy-screw-956.notion.site/Kallong-2ced82040c488001b27bdce25e66fae7?source=copy_link'
              className='inline-flex items-center gap-1'
            >
              <Text span>{t('auth.view')}</Text>
              <Forward color='black' size={24} />
            </Link>
          </div>
          <div className='flex flex-row flex-1 justify-between'>
            <Checkbox
              label={t('auth.privacyPolicy')}
              {...methods.register('privacyPolicy')}
            />
            <Link
              href='https://busy-screw-956.notion.site/Kallong-2ced82040c488099a766fb47ab9ae793?source=copy_link'
              className='inline-flex items-center gap-1'
            >
              <Text span>{t('auth.view')}</Text>
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
          {t('auth.signUp')}
        </Button>
      </form>

      <Link href='/mypage/signin' className='mt-5'>
        {t('auth.alreadyHaveAccount')} <RightSquare className='inline mx-1' />
        {t('auth.signIn')}
      </Link>
    </div>
  );
}
