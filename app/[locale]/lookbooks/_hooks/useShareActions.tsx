import { useRef, useState } from 'react';
import { domToPng } from 'modern-screenshot';
import { useTranslations } from 'next-intl';
import { showNotification } from '@/components';
import { useBridge, useDetectWebView } from '@/hooks';

export function useShareActions() {
  const t = useTranslations();
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
      showNotification({
        title: t('Common.succeed', { type: t('Lookbook.title') }),
        message: t('Lookbook.share.imageCaptureSucceed'),
        type: 'success',
      });
    } catch {
      showNotification({
        title: t('Common.fail', { type: t('Lookbook.title') }),
        message: t('Lookbook.error.imageCaptureFailed'),
        type: 'fail',
      });
    }
  };

  const handleCopy = async () => {
    const copyUrl = window.document.location.href;
    try {
      await navigator.clipboard.writeText(copyUrl);
      showNotification({
        title: t('Common.succeed', { type: t('Lookbook.title') }),
        message: t('Lookbook.share.linkCopySucceed'),
        type: 'success',
      });
    } catch {
      showNotification({
        title: t('Common.fail', { type: t('Lookbook.title') }),
        message: t('Lookbook.error.linkCopyFailed'),
        type: 'fail',
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
