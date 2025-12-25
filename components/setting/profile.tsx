'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Text } from '@mantine/core';
import { useSignOut } from '@/apis/querys/auth/useSignOut';
import { useProfileStore } from '@/hooks/provider/profile-provider';
import { getDaysSince } from '@/shared/common/utils';

export const Profile = () => {
  const router = useRouter();
  const { profile } = useProfileStore((s) => s);
  const { mutate: signout } = useSignOut();

  const handleSignOut = () => {
    signout(undefined, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  if (!profile) return <div>Loading...</div>;

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
      <div className='mt-8 flex flex-row items-center'>
        <Button variant='outline' c='black' onClick={handleSignOut}>
          로그아웃
        </Button>
        {/* <Divider
          size='sm'
          orientation='vertical'
          color='black'
          h={24}
          className='self-center'
        /> */}
        {/* <Button variant='transparent' c='black' onClick={handleDeleteAccount}>
          회원탈퇴
        </Button> */}
      </div>
    </Box>
  );
};
