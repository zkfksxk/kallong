'use client';

import { useTheme } from 'next-themes';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { CaptureIcon, CopyIcon, GridIcon } from '@/shared/common/icons';
import { Button } from './button';

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
  const { theme } = useTheme();
  const iconColor = theme === 'dark' ? 'black' : 'white';
  const buttonRef = useOutsideClick<HTMLButtonElement>(onClose);

  return (
    <div className='absolute bottom-2 right-0'>
      <div className='group relative flex flex-col-reverse items-end gap-2'>
        <Button
          variant='ghost'
          ref={buttonRef}
          onClick={onToggleVisible}
          className='!w-14 !h-14 rounded-lg bg-black text-white dark:bg-white dark:text-black border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
        >
          <GridIcon size={32} color={iconColor} />
        </Button>
        {visible && (
          <>
            <Button
              variant='ghost'
              className='!w-14 !h-14 rounded-lg bg-black text-white dark:bg-white dark:text-black border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
              onClick={onCopy}
            >
              <CopyIcon size={32} color={iconColor} />
            </Button>
            <Button
              variant='ghost'
              className='!w-14 !h-14 rounded-lg bg-black text-white dark:bg-white dark:text-black border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
              onClick={onCapture}
            >
              <CaptureIcon size={32} color={iconColor} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
