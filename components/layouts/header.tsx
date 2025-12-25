import { Text } from '@mantine/core';
import { Link } from '@/i18n/navigation';
import { ICONS } from '@/shared/common/icons';

interface HeaderProps {
  leftComponent?: React.ReactNode;
  className?: string;
  isSettingShow?: boolean;
  title?: string;
}

export const Header = ({
  leftComponent,
  className,
  isSettingShow = true,
  title,
}: HeaderProps) => {
  const { Setting } = ICONS;

  return (
    <header
      className={`
        w-full 
        max-w-[500px] 
        h-18
        flex 
        items-center 
        ${leftComponent ? 'justify-between' : 'justify-end'}
        mx-auto
        bg-white
        gap-3
        z-50
        ${className}
        `}
    >
      {leftComponent}
      {title && <Text>{title}</Text>}
      {isSettingShow && (
        <Link href='/setting'>
          <Setting color='black' size={24} />
        </Link>
      )}
    </header>
  );
};
