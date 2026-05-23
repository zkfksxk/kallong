'use client';

import { ActionIcon } from '@mantine/core';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { CaptureIcon, CopyIcon, GridIcon } from '@/shared/common/icons';

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
    <div className='absolute bottom-10 right-0'>
      <div className='group relative flex flex-col-reverse items-end gap-2'>
        <ActionIcon
          variant='filled'
          size='52px'
          radius='xl'
          ref={buttonRef}
          onClick={onToggleVisible}
          style={{
            color:
              'light-dark(var(--mantine-color-white), var(--mantine-color-black))',
            background:
              'light-dark(var(--mantine-color-black), var(--mantine-color-white))',
          }}
        >
          <GridIcon size={32} />
        </ActionIcon>
        {visible && (
          <>
            <ActionIcon
              variant='filled'
              size='52px'
              radius='xl'
              onClick={onCopy}
              style={{
                color:
                  'light-dark(var(--mantine-color-white), var(--mantine-color-black))',
                background:
                  'light-dark(var(--mantine-color-black), var(--mantine-color-white))',
              }}
            >
              <CopyIcon size={32} />
            </ActionIcon>
            <ActionIcon
              variant='filled'
              size='52px'
              radius='xl'
              onClick={onCapture}
              style={{
                color:
                  'light-dark(var(--mantine-color-white), var(--mantine-color-black))',
                background:
                  'light-dark(var(--mantine-color-black), var(--mantine-color-white))',
              }}
            >
              <CaptureIcon size={32} />
            </ActionIcon>
          </>
        )}
      </div>
    </div>
  );
}
