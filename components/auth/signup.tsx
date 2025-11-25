'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Text, TextInput } from '@mantine/core';
import { useSignUp } from '@/apis/querys/auth/useSignUp';

export const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: signUp, isPending } = useSignUp();

  const handleSubmit = () => {
    if (email.trim() === '') return;
    if (password.trim() === '') return;

    signUp(
      { email, password },
      {
        onSuccess: () => {
          router.push('/mypage/signin');
        },
      }
    );
  };

  return (
    <div className='w-full flex flex-col'>
      <Text ta='center'>회원가입</Text>
      <div className='w-full flex flex-col gap-2 mb-8'>
        <TextInput
          label='이메일'
          type='email'
          placeholder='example@abc.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
        <TextInput
          label='비밀번호'
          type='password'
          placeholder='8자 이상의 문자+숫자'
          onChange={(e) => setPassword(e.target.value)}
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
        회원가입
      </Button>
      <Link href='/mypage/signin' className='mt-5'>
        <Button variant='subtle' color='black' size='md' radius='md' p='0'>
          이미 계정이 있다면? ➡️ 로그인
        </Button>
      </Link>
    </div>
  );
};
