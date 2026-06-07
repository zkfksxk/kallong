import { useRef, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { domToPng } from 'modern-screenshot';
import { CheckIcon, CloseIcon } from '@/shared/common/icons';
import { useBridge } from './useBridge';
import { useDetectWebView } from './useDetectWebView';

export function useShareActions() {
  const { canUseBridge } = useDetectWebView();
  const { shareImage } = useBridge();
  const [visible, setVisible] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const filename = `lookbook_${Date.now()}.png`;

  const handleToggleVisible = () => setVisible((prev) => !prev);

  const handleCapture = async () => {
    if (!captureRef.current) return;

    try {
      const dataUrl = await domToPng(captureRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2,
      });

      if (canUseBridge) {
        shareImage({
          dataUrl,
          filename,
        });
      } else {
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
      }
      notifications.show({
        title: 'Successfully Captured',
        message: '이미지 캡처가 완료되었습니다',
        icon: <CheckIcon color='blue' size={24} />,
        loading: false,
      });
    } catch {
      notifications.show({
        title: 'Capture Failed',
        message: '캡쳐 중 오류가 발생했습니다.',
        icon: <CloseIcon color='red' size={24} />,
        loading: false,
      });
    }
  };

  const handleCopy = async () => {
    const copyUrl = window.document.location.href;
    try {
      await navigator.clipboard.writeText(copyUrl);
      notifications.show({
        title: 'Successfully Copied',
        message: '링크가 복사되었습니다',
        icon: <CheckIcon color='blue' size={24} />,
        loading: false,
      });
    } catch {
      notifications.show({
        title: 'Copy Failed',
        message: '링크 복사 중 오류가 발생했습니다.',
        icon: <CloseIcon color='red' size={24} />,
        loading: false,
      });
    }
  };

  return {
    visible,
    captureRef,
    handleToggleVisible,
    handleCapture,
    handleCopy,
    setVisible,
  };
}
