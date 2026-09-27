'use client';

import { ReactNode } from 'react';
import { Text } from '@mantine/core';
import { Link, useRouter } from '@/i18n/navigation';
import { BackIcon, SettingIcon } from '@/shared/common/icons';
import { Button } from '../ui';

interface Props {
  isSettingShow?: boolean;
  isBackShow?: boolean;
  rightComponent?: ReactNode;
  className?: string;
  title?: string;
}

export const Header = ({
  isSettingShow,
  isBackShow,
  className,
  rightComponent,
  title,
}: Props) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header
      className={`
        w-full 
        max-w-125 
        h-16
        flex 
        items-center 
        ${isBackShow ? 'justify-between' : 'justify-end'}
        mx-auto
        bg-white
        dark:bg-black
        gap-3
        z-50
        ${className}
        `}
    >
      {isBackShow && (
        <Button variant='ghost' onClick={handleBack}>
          <BackIcon className='text-black dark:text-white' size={24} />
        </Button>
      )}

      {title && <Text>{title}</Text>}
      {rightComponent && rightComponent}

      {isSettingShow && (
        <Link href='/setting'>
          <SettingIcon className='text-black dark:text-white' size={24} />
        </Link>
      )}
    </header>
  );
};
