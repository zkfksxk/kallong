'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useUpdateNickname } from '@/apis/querys/auth/useUpdateNickname';
import { useProfileStore } from '@/hooks/provider/profile-provider';
import { useRouter } from '@/i18n/navigation';
import {
  NicknameFormData,
  nicknameSchema,
} from '@/shared/common/constants/form';
import { ICONS } from '@/shared/common/icons';

export default function NicknameChangePage() {
  const t = useTranslations('Setting');
  const router = useRouter();
  const { setProfile, profile } = useProfileStore((s) => s);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {
      nickname: profile?.nickname ?? '',
    },
    mode: 'onChange',
  });
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
          message: t('auth.nicknameChangeFail'),
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
            type='text'
            placeholder={t('auth.nicknamePlaceholder')}
            {...register('nickname')}
            error={
              errors.nickname?.message
                ? t(errors.nickname.message as string)
                : undefined
            }
            disabled={isSubmitting}
          />
        </div>
        <Button
          type='submit'
          variant='filled'
          size='lg'
          radius='md'
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
        >
          {t('auth.saveButton')}
        </Button>
      </form>
    </div>
  );
}
