import { ActionIcon, Text } from '@mantine/core';
import { ICONS } from '@/shared/common/icons';

const { Heart } = ICONS;

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
          <Heart.Fill size={32} color='#E3231F' onClick={onToggle} />
        ) : (
          <Heart.Outline size={32} color='#E3231F' onClick={onToggle} />
        )}
      </ActionIcon>
      <Text size='xl'>{votes}</Text>
    </div>
  );
}
