import { Text } from '@mantine/core';

export const InputError = ({ label }: { label: string }) => {
  return (
    <Text size='sm' c='red'>
      {label}
    </Text>
  );
};
