import { Text } from '@mantine/core';
import { useRouter } from '@/i18n/navigation';
import { ICONS } from '@/shared/common/icons';

interface Props {
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  isBackbutton?: boolean;
  className?: string;
  title?: string;
}

export const Header = ({
  leftComponent,
  rightComponent,
  isBackbutton,
  className,
  title,
}: Props) => {
  const router = useRouter();
  const { Back } = ICONS;

  const handleBack = () => {
    router.back();
  };

  return (
    <header
      className={`
        w-full 
        max-w-125 
        h-18
        flex 
        items-center 
        ${leftComponent || isBackbutton ? 'justify-between' : 'justify-end'}
        mx-auto
        bg-white
        dark:bg-black
        gap-3
        z-50
        ${className}
        `}
    >
      {isBackbutton && (
        <button onClick={handleBack}>
          <Back className='text-black dark:text-white' size={24} />
        </button>
      )}
      {leftComponent}
      {title && <Text>{title}</Text>}
      {rightComponent}
    </header>
  );
};
