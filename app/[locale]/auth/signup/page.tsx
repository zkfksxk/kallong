'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { IoCloseCircle as Close } from 'react-icons/io5';
import { CustomAuthError } from '@/apis/error';
import { useSignUp } from '@/apis/querys/auth/useSignUp';
import { Link, useRouter } from '@/i18n/navigation';
import { SignUpFormData, signUpSchema } from '@/shared/common/constants/form';
import { ICONS } from '@/shared/common/icons';

export default function SignUpPage() {
  const t = useTranslations('Setting');
  const router = useRouter();
  const locale = useLocale();
  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmed: '',
      nickname: '',
      termsOfService: false,
      privacyPolicy: false,
    },
    mode: 'onChange',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { mutate: signUp, isPending } = useSignUp();

  const { Forward } = ICONS;

  const onSubmit = (data: SignUpFormData) => {
    if (!data.termsOfService || !data.privacyPolicy) {
      notifications.show({
        title: t('auth.signUp'),
        message: t('auth.error.termsRequired'),
        icon: <Close color='red' size={24} />,
        withCloseButton: false,
        loading: false,
        color: 'transperant',
      });
      return;
    }

    signUp(
      {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        locale,
      },
      {
        onSuccess: () => {
          router.push('/auth/signin');
        },
        onError: (error) => {
          const errorObj = JSON.parse(error.message) as CustomAuthError;
          const message = t(`auth.error.${errorObj.code}`);

          notifications.show({
            title: t('auth.signUpFail'),
            message,
            icon: <Close color='red' size={24} />,
            withCloseButton: false,
            loading: false,
            color: 'transperant',
          });
        },
      }
    );
  };

  return (
    <div className='w-full flex flex-col'>
      <Text ta='center' size='2xl' fw={700}>
        {t('auth.signUp')}
      </Text>

      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
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
            disabled={isPending}
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
            disabled={isPending}
          />
          <TextInput
            label={t('auth.passwordConfirmed')}
            type='password'
            placeholder={t('auth.passwordConfirmedPlaceholder')}
            {...register('passwordConfirmed')}
            error={
              errors.passwordConfirmed?.message
                ? t(errors.passwordConfirmed.message as string)
                : undefined
            }
            disabled={isPending}
          />
          <TextInput
            label={t('auth.nickname')}
            type='text'
            placeholder={t('auth.nicknamePlaceholder')}
            {...register('nickname')}
            error={
              errors.nickname?.message
                ? t(errors.nickname.message as string)
                : undefined
            }
            disabled={isPending}
          />
          <div className='flex flex-row flex-1 justify-between'>
            <Checkbox
              label={t('auth.termsOfService')}
              {...register('termsOfService')}
              error={
                errors.termsOfService?.message
                  ? t(errors.termsOfService.message as string)
                  : undefined
              }
              disabled={isPending}
            />
            <Link
              href='https://busy-screw-956.notion.site/Kallong-2ced82040c488001b27bdce25e66fae7?source=copy_link'
              className='inline-flex items-center gap-1'
            >
              <Text span size='sm'>
                {t('auth.view')}
              </Text>
              <Forward className='text-black dark:text-white' size={24} />
            </Link>
          </div>
          <div className='flex flex-row flex-1 justify-between'>
            <Checkbox
              label={t('auth.privacyPolicy')}
              {...register('privacyPolicy')}
              error={
                errors.privacyPolicy?.message
                  ? t(errors.privacyPolicy.message as string)
                  : undefined
              }
              disabled={isPending}
            />
            <Link
              href='https://busy-screw-956.notion.site/Kallong-2ced82040c488099a766fb47ab9ae793?source=copy_link'
              className='inline-flex items-center gap-1'
            >
              <Text span size='sm'>
                {t('auth.view')}
              </Text>
              <Forward className='text-black dark:text-white' size={24} />
            </Link>
          </div>
        </div>

        <Button
          type='submit'
          variant='filled'
          size='lg'
          radius='md'
          disabled={isPending}
        >
          {t('auth.signUp')}
        </Button>
      </form>

      <Link href='/mypage/signin' className='mt-4 text-black dark:text-white'>
        {t('auth.alreadyHaveAccount')}
      </Link>
    </div>
  );
}
