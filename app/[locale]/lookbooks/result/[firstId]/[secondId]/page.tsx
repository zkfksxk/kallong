'use client';

import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { ActionIcon, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { domToPng } from 'modern-screenshot';
import { useTranslations } from 'next-intl';
import { useCheckLookbookLiked } from '@/apis/querys/useCheckLookbookLiked';
import { useGetLookbook } from '@/apis/querys/useGetLookbook';
import { useToggleLookbookLike } from '@/apis/querys/useToggleLookbookLike';
import Fallback from '@/components/fallback';
import Loader from '@/components/loader';
import { ResultImage } from '@/components/lookbooks/result/result-image';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRemainingTime } from '@/hooks/useRemainingTime';
import { ICONS } from '@/shared/common/icon';
import { hanna } from '@/shared/theme/theme';

export default function ResultPage() {
  const t = useTranslations('Lookbooks.result');
  const [visible, setVisible] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const { firstId, secondId } = useParams<{
    firstId: string;
    secondId: string;
  }>();
  const notificationsRef = useRef<HTMLDivElement>(null);
  const buttnRef = useOutsideClick<HTMLButtonElement>(() => setVisible(false));
  const {
    data: firstLookbook,
    isLoading: firstLoading,
    error: firstError,
  } = useGetLookbook(firstId);
  const {
    data: secondLookbook,
    isLoading: secondLoading,
    error: secondError,
  } = useGetLookbook(secondId);
  const { mutate: toggleMutate } = useToggleLookbookLike();
  const { data: isFirstLookbookLiked } = useCheckLookbookLiked(firstId);
  const { data: isSecondLookbookLiked } = useCheckLookbookLiked(secondId);
  const remainingTime = useRemainingTime(firstLookbook?.created_at);

  const { Heart, Check, Grid, Copy, Capture, Alert } = ICONS;

  const handleToggleVisible = () => setVisible((prev) => !prev);

  const handleCapture = async () => {
    if (!captureRef.current) return;

    try {
      const dataUrl = await domToPng(captureRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2,
      });

      const link = document.createElement('a');
      link.download = `${new Date().getFullYear()}.png`;
      link.href = dataUrl;
      link.click();

      notifications.show({
        title: 'Successfully Captured',
        message: '이미지 캡처가 완료되었습니다!',
        icon: <Check color='blue' size={24} />,
        loading: false,
      });
    } catch (error) {
      console.error('캡처 실패:', error);
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

  const handleToggle = (lookbookId: string) => {
    if (remainingTime === '00:00') {
      notifications.show({
        title: '투표 마감',
        message: '이미 투표 시간이 종료되었습니다.',
        icon: <Alert.Close color='red' size={24} />,
        loading: false,
      });
      return;
    }

    toggleMutate(lookbookId, {
      onError: (error) => {
        notifications.show({
          title: 'Like Failed',
          message: '좋아요 처리에 실패했습니다. 다시 시도해 주세요.',
          icon: <Alert.Close color='red' size={24} />,
          loading: false,
        });
        console.error('좋아요 토글 에러:', error);
      },
    });
  };

  if (firstLoading || secondLoading) return <Loader />;

  if (firstError || secondError) return <Fallback />;

  return (
    <main
      ref={notificationsRef}
      className='relative bg-white max-w-[500px] w-full mx-auto flex flex-1 pt-10 pb-40 flex-col items-center '
    >
      <div ref={captureRef} className='w-full flex flex-col flex-1 px-10'>
        <div className='flex flex-col text-center'>
          <Text size='xxl' fw='bold'>
            {t('title')}
          </Text>
          <Text size='xl' fw='bold' c='red'>
            {remainingTime === '00:00'
              ? '투표가 종료되었습니다.'
              : remainingTime}
          </Text>
        </div>
        <div className='w-full flex flex-col'>
          <Text size='xl' fw='bold' className='self-end'>
            {firstLookbook.name}
          </Text>
          <ResultImage image_url={firstLookbook.image_url} />
          <div className='flex flex-row items-center justify-end'>
            <ActionIcon variant='transparent' size='52px' radius='xl'>
              {isFirstLookbookLiked ? (
                <Heart.Fill
                  size={32}
                  color='red'
                  onClick={() => handleToggle(firstId)}
                />
              ) : (
                <Heart.Outline
                  size={32}
                  color='red'
                  onClick={() => handleToggle(firstId)}
                />
              )}
            </ActionIcon>
            <Text size='xl'>{firstLookbook.votes}</Text>
          </div>
        </div>
        <Text
          style={{
            fontFamily: hanna.style.fontFamily,
            fontSize: '40pt',
          }}
          ta='center'
        >
          VS
        </Text>
        <div className='w-full flex flex-col'>
          <Text size='xl' fw='bold' className='self-end'>
            {secondLookbook.name}
          </Text>
          <ResultImage image_url={secondLookbook.image_url} />
          <div className='flex flex-row items-center justify-end'>
            <ActionIcon variant='transparent' size='52px' radius='xl'>
              {isSecondLookbookLiked ? (
                <Heart.Fill
                  size={32}
                  color='red'
                  onClick={() => handleToggle(secondId)}
                />
              ) : (
                <Heart.Outline
                  size={32}
                  color='red'
                  onClick={() => handleToggle(secondId)}
                />
              )}
            </ActionIcon>
            <Text size='xl'>{secondLookbook.votes}</Text>
          </div>
        </div>
      </div>
      <div className='absolute bottom-22 right-4'>
        <div className='group relative flex flex-col-reverse items-end gap-2'>
          <ActionIcon
            variant='filled'
            size='52px'
            radius='xl'
            ref={buttnRef}
            color='black'
            onClick={handleToggleVisible}
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
                onClick={handleCopy}
              >
                <Copy color='white' size={32} />
              </ActionIcon>
              <ActionIcon
                variant='filled'
                size='52px'
                radius='xl'
                color='black'
                onClick={handleCapture}
              >
                <Capture color='white' size={32} />
              </ActionIcon>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
