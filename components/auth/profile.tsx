'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@mantine/core';
import { useSignOut } from '@/apis/querys/auth/useSignOut';
import { useSessionStore } from '@/hooks/provider/session-provider';

export const Profile = () => {
  const router = useRouter();
  const { session } = useSessionStore((s) => s);
  const { mutate: signout } = useSignOut();

  const handleSignOut = () => {
    signout(undefined, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <div>
      {session?.user.email}
      <Button onClick={handleSignOut}>로그아웃</Button>
    </div>
  );
};
