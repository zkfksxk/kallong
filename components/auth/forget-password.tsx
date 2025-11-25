'use client';

import { useState } from 'react';
import { Button, Text, TextInput } from '@mantine/core';
import { useResetPassword } from '@/apis/querys/auth/useResetPassword';

export const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const { mutate: resetPassword, isPending } = useResetPassword();

  const handleSubmit = () => {
    if (email.trim() === '') return;
    resetPassword(email, {
      onSuccess: () => {
        setEmail('');
      },
      onError: (error) => {
        console.log('패스워드 리셋 실패', error);
        setEmail('');
      },
    });
  };

  return (
    <div className='w-full flex flex-col'>
      <Text ta='center'>비밀번호를 잊으셨나요?</Text>
      <Text ta='center' size='sm'>
        이메일로 비밀번호를 재설정 할 수 있는 인증 링크를 보내드립니다.
      </Text>
      <div className='w-full flex flex-col gap-2 mb-8'>
        <TextInput
          label='이메일'
          type='email'
          placeholder='example@abc.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
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
        인증 메일 요청하기
      </Button>
    </div>
  );
};
