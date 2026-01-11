'use client';

import { Button, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from 'react-hook-form';
import { useUpdateNickname } from '@/apis/querys/auth/useUpdateNickname';
import { useProfileStore } from '@/hooks/provider/profile-provider';
import { useRouter } from '@/i18n/navigation';
import { AUTH_FORM_RULES } from '@/shared/common/constants';
import { ICONS } from '@/shared/common/icons';

export default function NicknameChangePage() {
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
          title: 'Nickname Change Success',
          message: 'Nickname Change Success',
          icon: <Alert.Check color='blue' size={24} />,
          withCloseButton: false,
          loading: false,
          color: 'transperant',
        });
        router.replace('/setting/userinfo');
      },
      onError: () => {
        notifications.show({
          title: 'Nickname Change Failed',
          message: 'Nickname Change Failed',
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
            {...register('nickname', AUTH_FORM_RULES.nickname)}
            label='닉네임 변경'
            type='nickname'
            placeholder='홍길동'
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
          저장하기
        </Button>
      </form>
    </div>
  );
}
