'use client';

import { Text } from '@mantine/core';
import { GoHomeFill as HomeFill } from 'react-icons/go';
import { GoHome as HomeOutline } from 'react-icons/go';
import { GoPersonFill as PersonFill } from 'react-icons/go';
import { GoPerson as PersonOutline } from 'react-icons/go';
import { Link, usePathname } from '@/i18n/navigation';

export const TabMenu = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isMypage = pathname.includes('/mypage');

  return (
    <div className='fixed bottom-0 mx-auto flex max-w-[500px] w-full py-[10px] border-t border-gray-200 bg-white'>
      <Link
        href='/'
        className='flex-1 flex flex-col items-center justify-center gap-1'
      >
        {isHome ? (
          <HomeFill size={24} color='black' />
        ) : (
          <HomeOutline size={24} color='black' />
        )}
        <Text size='xs' fw={isHome ? 600 : 400}>
          홈
        </Text>
      </Link>

      <Link
        href='/mypage'
        className='flex-1 flex flex-col items-center justify-center gap-1'
      >
        {isMypage ? (
          <PersonFill size={24} color='black' />
        ) : (
          <PersonOutline size={24} color='black' />
        )}

        <Text size='xs' fw={isMypage ? 600 : 400}>
          마이페이지
        </Text>
      </Link>
    </div>
  );
};
