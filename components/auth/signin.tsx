'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Text, TextInput } from '@mantine/core';
import { FcGoogle as Google } from 'react-icons/fc';
import { useSignInWithPassword } from '@/apis/querys/auth/useSignIn';
import { useSignInWithGoogle } from '@/apis/querys/auth/useSignInGoogle';

export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: signIn } = useSignInWithPassword();
  const { mutate: signInWithGoogle } = useSignInWithGoogle();

  const handleSubmit = () => {
    if (email.trim() === '') return;
    if (password.trim() === '') return;

    signIn(
      { email, password },
      {
        onSuccess: (data) => {
          router.push('/');
          console.log(data);
        },
        onError: (error) => {
          //const message = handleAuthErrorMessage(error);
          console.log(error);
          alert(`로그인 실패했습니다. 다시 시도해주세요`);
        },
      }
    );
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      signInWithGoogle();
    } catch (error) {
      console.error('Error logging in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full flex flex-col'>
      <Text ta='center'>로그인</Text>
      <div className='w-full flex flex-col gap-2 mb-8'>
        <TextInput
          label='이메일'
          type='email'
          placeholder='example@abc.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
      >
        로그인
      </Button>
      <div className='flex flex-col mt-8 gap-5'>
        <Button
          leftSection={<Google size={14} />}
          variant='outline'
          size='lg'
          radius='md'
          color='black'
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          Continue with Google
        </Button>
        <Link href='/mypage/signup'>
          <Button variant='subtle' color='black' size='md' radius='md' p='0'>
            계정이 없다면? ➡️ 회원가입
          </Button>
        </Link>
        <Link href='/mypage/password/reset'>
          <Button variant='subtle' color='black' size='md' radius='md' p='0'>
            비밀번호를 잊으셨나요?
          </Button>
        </Link>
      </div>
    </div>
  );
};
