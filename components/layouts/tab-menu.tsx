'use client';

import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { ICONS } from '@/shared/common/icons';

export const TabMenu = () => {
  const t = useTranslations('Tab');
  const { Home, Person } = ICONS;
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isMypage = pathname.includes('/mypage');

  return (
    <div className='fixed bottom-0 mx-auto h-15 flex max-w-[500px] w-full  border-t border-gray-200 bg-white'>
      <Link
        href='/'
        className='flex-1 flex flex-col items-center justify-center gap-1'
      >
        {isHome ? (
          <Home.Fill size={24} color='black' />
        ) : (
          <Home.Outline size={24} color='black' />
        )}
        <Text size='xs' fw={isHome ? 600 : 400}>
          {t('home')}
        </Text>
      </Link>

      <Link
        href='/mypage'
        className='flex-1 flex flex-col items-center justify-center gap-1'
      >
        {isMypage ? (
          <Person.Fill size={24} color='black' />
        ) : (
          <Person.Outline size={24} color='black' />
        )}

        <Text size='xs' fw={isMypage ? 600 : 400}>
          {t('my')}
        </Text>
      </Link>
    </div>
  );
};
