'use client';

import { Button, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useUpdateNickname } from '@/apis/querys/auth/useUpdateNickname';
import { useProfileStore } from '@/hooks/provider/profile-provider';
import { useRouter } from '@/i18n/navigation';
import { AUTH_FORM_RULES } from '@/shared/common/constants';
import { ICONS } from '@/shared/common/icons';

export default function NicknameChangePage() {
  const t = useTranslations('Setting');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{ nickname: string }>();
  const { setProfile, profile } = useProfileStore((s) => s);
  const { mutate: changeNickname } = useUpdateNickname();
  const { Alert } = ICONS;

  const onSubmit = (data: { nickname: string }) => {
    changeNickname(data.nickname, {
      onSuccess: () => {
        reset();
        if (profile) {
          setProfile({ ...profile, nickname: data.nickname });
        }
        notifications.show({
          title: t('auth.nicknameChange'),
          message: t('auth.nicknameChangeSucceed'),
          icon: <Alert.Check color='blue' size={24} />,
          withCloseButton: false,
          loading: false,
          color: 'transperant',
        });
        router.replace('/setting/userinfo');
      },
      onError: () => {
        notifications.show({
          title: t('auth.nicknameChange'),
          message: t('auth.failNicknameChange'),
          icon: <Alert.Close color='red' size={24} />,
          withCloseButton: false,
          loading: false,
          color: 'transperant',
        });
      },
    });
  };

  return (
    <div className='w-full flex flex-col'>
      <form className='flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full flex flex-col gap-2 mb-8'>
          <TextInput
            label={t('auth.nicknameChange')}
            type='nickname'
            placeholder={t('auth.nicknamePlaceholder')}
            {...register('nickname', {
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
            error={errors.nickname?.message}
            disabled={isSubmitting}
          />
        </div>
        <Button
          type='submit'
          variant='filled'
          color='black'
          size='lg'
          radius='md'
          loading={isSubmitting}
        >
          {t('auth.saveButton')}
        </Button>
      </form>
    </div>
  );
}
