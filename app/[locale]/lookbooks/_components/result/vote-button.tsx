import { ActionIcon, Text } from '@mantine/core';
import { HeartFillIcon, HeartOutlineIcon } from '@/shared/common/icons';

interface VoteButtonProps {
  isLiked: boolean;
  votes: number;
  onToggle: () => void;
}

export function VoteButton({ isLiked, votes, onToggle }: VoteButtonProps) {
  return (
    <div className='flex flex-row items-center justify-end'>
      <ActionIcon variant='transparent' size='52px' radius='xl'>
        {isLiked ? (
          <HeartFillIcon size={32} color='#E3231F' onClick={onToggle} />
        ) : (
          <HeartOutlineIcon size={32} color='#E3231F' onClick={onToggle} />
        )}
      </ActionIcon>
      <Text size='xl'>{votes}</Text>
    </div>
  );
}
