'use client';

import { useRef } from 'react';
import { useParams } from 'next/navigation';
import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useGetLookbook } from '@/apis/querys/useGetLookbook';
import Fallback from '@/components/fallback';
import Loader from '@/components/loader';
import { ResultImage } from '@/components/lookbooks/result/result-image';
import { VoteButton } from '@/components/lookbooks/result/vote-button';
import { ShareActionButtons } from '@/components/ui/share-button';
import { useRemainingTime } from '@/hooks/useRemainingTime';
import { useShareActions } from '@/hooks/useShareActions';
import { useVoteActions } from '@/hooks/useVoteActions';
import { hanna } from '@/shared/theme/theme';

export default function ResultPage() {
  const t = useTranslations('Lookbooks.result');
  const { firstId, secondId } = useParams<{
    firstId: string;
    secondId: string;
  }>();
  const notificationsRef = useRef<HTMLDivElement>(null);
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

  const remainingTime = useRemainingTime(firstLookbook?.created_at);
  const {
    visible,
    captureRef,
    handleToggleVisible,
    handleCapture,
    handleCopy,
    setVisible,
  } = useShareActions();
  const { isFirstLookbookLiked, isSecondLookbookLiked, handleToggle } =
    useVoteActions(firstId, secondId, remainingTime);

  if (firstLoading || secondLoading) return <Loader />;

  if (firstError || secondError) return <Fallback />;

  return (
    <main
      ref={notificationsRef}
      className='relative bg-white dark:bg-black w-full flex flex-1 pt-10 pb-30 flex-col items-center '
    >
      <div ref={captureRef} className='w-full flex flex-col flex-1 px-10'>
        <div className='flex flex-col text-center'>
          <Text size='xxl' fw='bold'>
            {t('title')}
          </Text>
          <Text size='xl' fw='bold' c='#CD1C18'>
            {remainingTime === '00:00' ? t('ended') : remainingTime}
          </Text>
        </div>
        <div className='w-full flex flex-col'>
          <Text size='xl' fw='bold' className='self-end'>
            {firstLookbook.name}
          </Text>
          <ResultImage image_url={firstLookbook.image_url} />

          <VoteButton
            isLiked={isFirstLookbookLiked}
            votes={firstLookbook.votes}
            onToggle={() => handleToggle(firstId)}
          />
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
          <VoteButton
            isLiked={isSecondLookbookLiked}
            votes={secondLookbook.votes}
            onToggle={() => handleToggle(secondId)}
          />
        </div>
      </div>
      <ShareActionButtons
        visible={visible}
        onToggleVisible={handleToggleVisible}
        onCopy={handleCopy}
        onCapture={handleCapture}
        onClose={() => setVisible(false)}
      />
    </main>
  );
}
