'use client';

import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { useDeleteAccount } from '@/apis/querys/auth/useDeleteAccount';
import { Button, CustomModal } from '@/components';
import { useProfileStore } from '@/hooks/provider/profile-provider';
import { Profile, ProfileSkeleton, SettingItem } from '../_components';

export default function UserInfoPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const t = useTranslations();
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
      <div className='bg-white dark:bg-black w-full flex flex-1 flex-col'>
        {!profile ? <ProfileSkeleton /> : <Profile />}
        <div className='flex flex-col mt-8'>
          <SettingItem
            url='/auth/password/reset'
            title={t('Auth.resetPassword.title')}
          />
          <SettingItem
            url='/auth/nickname'
            title={t('Auth.profile.nicknameChange')}
          />
        </div>
        <Button
          variant='ghost'
          onClick={open}
          className='self-start mt-auto text-red-500'
          disabled={!profile || isPending}
        >
          {t('Auth.deleteAccount.title')}
        </Button>
      </div>
      <CustomModal
        opened={opened}
        onClose={close}
        title={t('Auth.deleteAccount.title')}
        description={t('Auth.deleteAccount.description')}
        submitLabel={t('Auth.deleteAccount.submit')}
        onSubmit={handleDeleteAccount}
      />
    </>
  );
}
