import { Text } from '@mantine/core';
import { Link } from '@/i18n/navigation';
import { ICONS } from '@/shared/common/icons';

interface Props {
  leftComponent?: React.ReactNode;
  className?: string;
  isSettingShow?: boolean;
  title?: string;
}

export const SettingHeader = ({
  leftComponent,
  className,
  isSettingShow = true,
  title,
}: Props) => {
  const { Setting } = ICONS;

  return (
    <header
      className={`
        w-full 
        max-w-125 
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
