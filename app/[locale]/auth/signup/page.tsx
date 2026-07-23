'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, Text, TextInput } from '@mantine/core';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { CustomError } from '@/apis/error';
import { useSignUp } from '@/apis/querys/auth/useSignUp';
import { Button, showNotification } from '@/components';
import { Link, useRouter } from '@/i18n/navigation';
import { ForwardIcon } from '@/shared/common/icons';
import { SignUpFormData, signUpSchema } from '../_constants/form';

export default function SignUpPage() {
  const t = useTranslations();
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

  const onSubmit = (data: SignUpFormData) => {
    if (!data.termsOfService || !data.privacyPolicy) {
      showNotification({
        title: t('Common.fail', { type: t('Auth.signUp.title') }),
        message: t('Auth.validation.termsRequired'),
        type: 'fail',
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
          const errorObj = JSON.parse(error.message) as CustomError;
          const message = t(`auth.error.${errorObj.errorCode}`);

          showNotification({
            title: t('Common.fail', { type: t('Auth.signUp.title') }),
            message,
            type: 'fail',
          });
        },
      }
    );
  };

  return (
    <div className='w-full flex flex-col'>
      <Text ta='center' size='2xl' fw={700}>
        {t('Auth.signUp.title')}
      </Text>

      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex flex-col gap-4 mb-8'>
          <TextInput
            label={t('Auth.field.email')}
            type='email'
            {...register('email')}
            error={
              errors.email?.message
                ? t(errors.email.message as string)
                : undefined
            }
            disabled={isPending}
          />
          <TextInput
            label={t('Auth.field.password')}
            type='password'
            description={t('Auth.passwordPolicy')}
            autoComplete='new-password'
            {...register('password')}
            error={
              errors.password?.message
                ? t(errors.password.message as string)
                : undefined
            }
            disabled={isPending}
          />
          <TextInput
            label={t('Auth.field.passwordConfirm')}
            type='password'
            autoComplete='new-password'
            {...register('passwordConfirmed')}
            error={
              errors.passwordConfirmed?.message
                ? t(errors.passwordConfirmed.message as string)
                : undefined
            }
            disabled={isPending}
          />
          <TextInput
            label={t('Auth.field.nickname')}
            type='text'
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
              label={t('Auth.field.terms.termsOfService')}
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
                {t('Common.view')}
              </Text>
              <ForwardIcon className='text-black dark:text-white' size={24} />
            </Link>
          </div>
          <div className='flex flex-row flex-1 justify-between'>
            <Checkbox
              label={t('Auth.field.terms.privacyPolicy')}
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
                {t('Common.view')}
              </Text>
              <ForwardIcon className='text-black dark:text-white' size={24} />
            </Link>
          </div>
        </div>

        <Button
          type='submit'
          variant='secondary'
          fullWidth
          disabled={isPending}
        >
          {t('Auth.signUp.title')}
        </Button>
      </form>

      <Link href='/mypage/signin' className='mt-4 text-black dark:text-white'>
        {t('Auth.signIn.alreadyHaveAccount')}
      </Link>
    </div>
  );
}
