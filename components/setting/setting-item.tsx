import { Text } from '@mantine/core';
import { Link } from '@/i18n/navigation';

interface Props {
  url: string;
  title: string;
}

export const SettingItem = ({ url, title }: Props) => {
  return (
    <Link
      href={url}
      className='flex flex-row items-center justify-between pb-8'
    >
      <Text size='lg' fw={700}>
        {title}
      </Text>
    </Link>
  );
};
