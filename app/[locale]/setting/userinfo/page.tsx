'use client';

import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { useDeleteAccount } from '@/apis/querys/auth/useDeleteAccount';
import { Profile } from '@/components/setting/profile';
import { ProfileSkeleton } from '@/components/setting/profile-skeleton';
import { SettingItem } from '@/components/setting/setting-item';
import { CustomModal } from '@/components/ui/custom-modal';
import { useProfileStore } from '@/hooks/provider/profile-provider';

export default function UserInfoPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const t = useTranslations('Setting');
  const { profile } = useProfileStore((s) => s);
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const handleDeleteAccount = () => {
    if (!profile) {
      return;
    }
    deleteAccount(profile.id);
    close();
  };

  return (
    <>
      <div className='bg-white w-full flex flex-1 flex-col'>
        {!profile ? <ProfileSkeleton /> : <Profile />}
        <div className='flex flex-col mt-8'>
          <SettingItem
            url='/auth/password/reset'
            title={t('auth.resetPassword')}
          />
          <SettingItem url='/auth/nickname' title={t('auth.nicknameChange')} />
        </div>
        <Button
          variant='transparent'
          size='sm'
          onClick={open}
          className='self-start mt-auto'
          disabled={!profile || isPending}
        >
          {t('auth.deleteAccount')}
        </Button>
      </div>
      <CustomModal
        opened={opened}
        onClose={close}
        title='회원 탈퇴'
        description='회원 탈퇴를 하시면 모든 정보는 삭제됩니다. 탈퇴하시겠습니까?'
        submitLabel='탈퇴하기'
        onSubmit={handleDeleteAccount}
      />
    </>
  );
}
