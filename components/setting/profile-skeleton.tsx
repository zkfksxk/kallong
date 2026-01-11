import { Box, Skeleton } from '@mantine/core';

export const ProfileSkeleton = () => {
  return (
    <Box bg='gray.1' className='flex flex-col p-5 rounded-md'>
      <Skeleton height={24} width='40%' mb={8} radius='sm' />
      <Skeleton height={18} width='60%' mb={8} radius='sm' />
      <Skeleton height={18} width='30%' radius='sm' />
      <Skeleton
        height={36}
        width={80}
        mt={20}
        radius='sm'
        className='self-start'
      />
    </Box>
  );
};
