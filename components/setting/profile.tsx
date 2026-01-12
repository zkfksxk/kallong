'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useSignOut } from '@/apis/querys/auth/useSignOut';
import { useProfileStore } from '@/hooks/provider/profile-provider';
import { getDaysSince } from '@/shared/common/utils';

export const Profile = () => {
  const t = useTranslations('Setting');
  const router = useRouter();
  const { profile } = useProfileStore((s) => s);
  const { mutate: signout } = useSignOut();

  if (!profile) return null;

  const handleSignOut = () => {
    signout(undefined, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  const daysSince = getDaysSince(profile.created_at);

  return (
    <Box bg='red.1' className='flex flex-col p-5 rounded-md'>
      <Text c='black' size='md' fw={700}>
        {profile?.nickname}
      </Text>
      <Text c='black' size='sm'>
        {profile?.email}
      </Text>
      <Text c='black' size='sm'>
        함께한 지 {daysSince}일째
      </Text>

      <Button
        variant='outline'
        c='black'
        onClick={handleSignOut}
        className='self-start mt-5'
      >
        {t('auth.logout')}
      </Button>
    </Box>
  );
};
