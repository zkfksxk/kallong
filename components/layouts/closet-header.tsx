import { Text } from '@mantine/core';

interface Props {
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  className?: string;
  title?: string;
}

export const ClosetHeader = ({
  leftComponent,
  rightComponent,
  className,
  title,
}: Props) => {
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
        dark:bg-black
        gap-3
        z-50
        ${className}
        `}
    >
      {leftComponent}
      {title && <Text>{title}</Text>}
      {rightComponent}
    </header>
  );
};
