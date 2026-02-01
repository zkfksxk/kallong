import { useRef, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { domToPng } from 'modern-screenshot';
import { ICONS } from '@/shared/common/icons';
import { MESSAGE_TYPE } from '@/shared/webview/constants';
import { useDetectWebView } from './useDetectWebView';

const { Check, Alert } = ICONS;

export function useShareActions() {
  const { isWebView } = useDetectWebView();
  const [visible, setVisible] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const handleToggleVisible = () => setVisible((prev) => !prev);

  const handleCapture = async () => {
    if (!captureRef.current) return;

    try {
      const dataUrl = await domToPng(captureRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2,
      });

      if (isWebView) {
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: MESSAGE_TYPE.download_image,
            data: dataUrl,
            filename: `lookbook_${new Date().getFullYear()}.png`,
          })
        );
      } else {
        const link = document.createElement('a');
        link.download = `lookbook_${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      }
      notifications.show({
        title: 'Successfully Captured',
        message: '이미지 캡처가 완료되었습니다!',
        icon: <Check color='blue' size={24} />,
        loading: false,
      });
    } catch {
      notifications.show({
        title: 'Capture Failed',
        message: '캡쳐 중 오류가 발생했습니다.',
        icon: <Alert.Close color='red' size={24} />,
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
        message: '링크가 복사되었습니다!',
        icon: <Check color='blue' size={24} />,
        loading: false,
      });
    } catch {
      notifications.show({
        title: 'Copy Failed',
        message: '복사 중 오류가 발생했습니다.',
        icon: <Alert.Close color='red' size={24} />,
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
