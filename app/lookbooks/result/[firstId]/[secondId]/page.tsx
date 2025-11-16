'use client';

import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { ActionIcon, Text } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import { toPng } from 'html-to-image';
import { IoCopyOutline as Copy } from 'react-icons/io5';
import { IoGridOutline as Grid } from 'react-icons/io5';
import { IoCheckmarkCircle as Check } from 'react-icons/io5';
import { IoCloseCircle as Close } from 'react-icons/io5';
import { IoHeartOutline as HeartOutline } from 'react-icons/io5';
import { IoHeartSharp as HeartSharp } from 'react-icons/io5';
import { TbCapture as Capture } from 'react-icons/tb';
import { useCheckLookbookLiked } from '@/apis/querys/useCheckLookbookLiked';
import { useGetLookbook } from '@/apis/querys/useGetLookbook';
import { useToggleLookbookLike } from '@/apis/querys/useToggleLookbookLike';
import { ResultImage } from '@/components/lookbooks/result/result-image';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRemainingTime } from '@/hooks/useRemainingTime';

export default function ResultPage() {
  const [visible, setVisible] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const { firstId, secondId } = useParams<{
    firstId: string;
    secondId: string;
  }>();
  const notificationsRef = useRef<HTMLDivElement>(null);
  const buttnRef = useOutsideClick<HTMLButtonElement>(() => setVisible(false));
  const { mutate: toggleMutate } = useToggleLookbookLike();
  const { data: firstLookbook, isLoading: firstLoading } =
    useGetLookbook(firstId);
  const { data: secondLookbook, isLoading: secondLoading } =
    useGetLookbook(secondId);
  const { data: isFirstLookbookLiked } = useCheckLookbookLiked(firstId);
  const { data: isSecondLookbookLiked } = useCheckLookbookLiked(secondId);
  const remainingTime = useRemainingTime(firstLookbook?.created_at);

  const handleToggleVisible = () => setVisible((prev) => !prev);

  const handleCapture = async () => {
    if (!captureRef.current) return;

    try {
      const dataUrl = await toPng(captureRef.current, {
        backgroundColor: '#FFFFFF',
        pixelRatio: 2,
        cacheBust: true,
        includeQueryParams: true,
      });

      const link = document.createElement('a');
      link.download = `${2025}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      alert('캡처 실패, 다시 시도해 주세요.');
      console.error('캡처 실패:', error);
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
        withCloseButton: false,
        loading: false,
        color: 'transperant',
      });
    } catch {
      notifications.show({
        title: 'Copy Failed',
        message: '복사 중 오류가 발생했습니다.',
        icon: <Close color='red' size={24} />,
        withCloseButton: false,
        loading: false,
        color: 'transperant',
      });
    }
  };

  const handleToggle = (lookbookId: string) => {
    if (remainingTime === '00:00') {
      notifications.show({
        title: '투표 마감',
        message: '이미 투표 시간이 종료되었습니다.',
        icon: <Close color='red' size={24} />,
        withCloseButton: false,
        loading: false,
        color: 'transperant',
      });
      return;
    }

    toggleMutate(lookbookId, {
      onError: (error) => {
        notifications.show({
          title: 'Like Failed',
          message: '좋아요 처리에 실패했습니다. 다시 시도해 주세요.',
          icon: <Close color='red' size={24} />,
          withCloseButton: false,
          loading: false,
          color: 'transperant',
        });
        console.error('좋아요 토글 에러:', error);
      },
    });
  };

  if (firstLoading || secondLoading) {
    return (
      <main className=' bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center justify-center'>
        <Text size='xl' c='gray'>
          룩북을 불러오는 중...
        </Text>
      </main>
    );
  }

  return (
    <main
      ref={notificationsRef}
      className='relative bg-white max-w-[500px] w-full mx-auto flex flex-1 flex-col items-center pb-25 px-10'
    >
      <Notifications position='bottom-right' />

      <div ref={captureRef} className='w-full flex flex-col flex-1'>
        <div className='flex flex-col text-center'>
          <Text size='xxl' fw='bold'>
            결과 확인
          </Text>
          <Text size='xl' fw='bold' c='red'>
            {remainingTime}
          </Text>
        </div>
        <div className='w-full flex flex-col'>
          <Text size='xl' fw='bold' className='self-end'>
            {firstLookbook.name}
          </Text>
          <ResultImage lookbook={firstLookbook} />
          <div className='flex flex-row items-center justify-end'>
            <ActionIcon variant='transparent' size='52px' radius='xl'>
              {isFirstLookbookLiked ? (
                <HeartSharp size={32} onClick={() => handleToggle(firstId)} />
              ) : (
                <HeartOutline size={32} onClick={() => handleToggle(firstId)} />
              )}
            </ActionIcon>
            <Text size='xl'>{firstLookbook.votes}</Text>
          </div>
        </div>
        <div className='w-full flex flex-col mt-[40px]'>
          <Text size='xl' fw='bold' className='self-end'>
            {secondLookbook.name}
          </Text>
          <ResultImage lookbook={secondLookbook} />
          <div className='flex flex-row items-center justify-end'>
            <ActionIcon variant='transparent' size='52px' radius='xl'>
              {isSecondLookbookLiked ? (
                <HeartSharp size={32} onClick={() => handleToggle(secondId)} />
              ) : (
                <HeartOutline
                  size={32}
                  onClick={() => handleToggle(secondId)}
                />
              )}
            </ActionIcon>
            <Text size='xl'>{secondLookbook.votes}</Text>
          </div>
        </div>
      </div>
      <div className='absolute bottom-2 right-4'>
        <div className='group relative flex flex-col-reverse items-end gap-2'>
          <ActionIcon
            variant='outline'
            size='52px'
            radius='xl'
            ref={buttnRef}
            onClick={handleToggleVisible}
          >
            <Grid size={32} />
          </ActionIcon>
          {visible && (
            <>
              <ActionIcon
                variant='outline'
                size='52px'
                radius='xl'
                onClick={handleCopy}
              >
                <Copy size={32} />
              </ActionIcon>
              <ActionIcon
                variant='outline'
                size='52px'
                radius='xl'
                onClick={handleCapture}
              >
                <Capture size={32} />
              </ActionIcon>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
