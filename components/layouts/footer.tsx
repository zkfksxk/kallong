import { Text } from '@mantine/core';

export const Footer = () => {
  return (
    <footer
      className='
        w-full 
        max-w-[500px] 
        h-[80px] 
        bg-[#e1e5eb]
        flex 
        items-center 
        justify-center 
        mx-auto'
    >
      <Text c='black'>
        © {`${new Date().getFullYear()} `}
        <Text span fw={600} c='black'>
          Kallong{' '}
        </Text>
        all rights reserved.
      </Text>
    </footer>
  );
};
