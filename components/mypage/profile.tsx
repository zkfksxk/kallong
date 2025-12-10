'use client';

import { useRouter } from 'next/navigation';
import { Button, Text } from '@mantine/core';
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

  const handleDeleteAccount = () => {};

  if (!profile) return <div>Loading...</div>;

  const daysSince = getDaysSince(profile.created_at);
  return (
    <div className='flex flex-col'>
      <Text>{profile?.email}</Text>
      <Text>{profile?.nickname}</Text>
      <Text>함께한 지 {daysSince}일째</Text>
      <Button onClick={handleSignOut}>로그아웃</Button>
      <Button onClick={handleDeleteAccount}>회원탈퇴</Button>
    </div>
  );
};
