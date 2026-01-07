'use client';

import { ActionIcon } from '@mantine/core';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { ICONS } from '@/shared/common/icons';

const { Grid, Copy, Capture } = ICONS;

interface ShareActionButtonsProps {
  visible: boolean;
  onToggleVisible: () => void;
  onCopy: () => void;
  onCapture: () => void;
  onClose: () => void;
}

export function ShareActionButtons({
  visible,
  onToggleVisible,
  onCopy,
  onCapture,
  onClose,
}: ShareActionButtonsProps) {
  const buttonRef = useOutsideClick<HTMLButtonElement>(onClose);

  return (
    <div className='absolute bottom-22 right-4'>
      <div className='group relative flex flex-col-reverse items-end gap-2'>
        <ActionIcon
          variant='filled'
          size='52px'
          radius='xl'
          ref={buttonRef}
          color='black'
          onClick={onToggleVisible}
        >
          <Grid color='white' size={32} />
        </ActionIcon>
        {visible && (
          <>
            <ActionIcon
              variant='filled'
              size='52px'
              radius='xl'
              color='black'
              onClick={onCopy}
            >
              <Copy color='white' size={32} />
            </ActionIcon>
            <ActionIcon
              variant='filled'
              size='52px'
              radius='xl'
              color='black'
              onClick={onCapture}
            >
              <Capture color='white' size={32} />
            </ActionIcon>
          </>
        )}
      </div>
    </div>
  );
}
