'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ActionIcon, Text } from '@mantine/core';
import { GoHomeFill as HomeFill } from 'react-icons/go';
import { GoHome as HomeOutline } from 'react-icons/go';
import { GoPersonFill as PersonFill } from 'react-icons/go';
import { GoPerson as PersonOutline } from 'react-icons/go';

export const TabMenu = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isMypage = pathname.includes('/mypage');

  return (
    <div className='fixed bottom-0 left-0 right-0 flex h-[80px] border-t border-gray-200 bg-white'>
      <Link
        href='/'
        className='flex-1 flex flex-col items-center justify-center gap-1'
      >
        <ActionIcon variant='subtle' size='xl' radius='md' title='home'>
          {isHome ? (
            <HomeFill size={32} color='black' />
          ) : (
            <HomeOutline size={32} color='black' />
          )}
        </ActionIcon>
        <Text size='xs' fw={isHome ? 600 : 400}>
          홈
        </Text>
      </Link>

      <Link
        href='/mypage'
        className='flex-1 flex flex-col items-center justify-center gap-1'
      >
        <ActionIcon variant='subtle' size='xl' radius='md' title='my'>
          {isMypage ? (
            <PersonFill size={32} color='black' />
          ) : (
            <PersonOutline size={32} color='black' />
          )}
        </ActionIcon>
        <Text size='xs' fw={isMypage ? 600 : 400}>
          마이페이지
        </Text>
      </Link>
    </div>
  );
};
