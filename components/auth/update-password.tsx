'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Text, TextInput } from '@mantine/core';
import { useUpdatePassword } from '@/apis/querys/auth/useUpdatePassword';

export const UpdatePassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const { mutate: updatePassword, isPending } = useUpdatePassword();

  const handleSubmit = () => {
    if (password.trim() === '') return;

    updatePassword(password, {
      onSuccess: () => {
        setPassword('');
        router.push('/');
      },
      onError: () => {
        console.log('error');
        setPassword('');
      },
    });
  };

  return (
    <div className='w-full flex flex-col'>
      <Text ta='center'>비밀번호 재설정하기</Text>
      <Text ta='center' size='sm'>
        새로운 비밀번호를 입력하세요
      </Text>
      <div className='w-full flex flex-col gap-2 mb-8'>
        <TextInput
          label='비밀번호'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button
        onClick={handleSubmit}
        variant='filled'
        color='blue.9'
        size='lg'
        radius='md'
        disabled={isPending}
      >
        비밀번호 변경하기
      </Button>
    </div>
  );
};
