'use client';

import { useEffect } from 'react';
import { Text } from '@mantine/core';
import { useInView } from 'react-intersection-observer';
import { useGetVoteById } from '@/apis/querys/useGetVoteById';
import Loader from '../loader';
import { LookbookItem } from './lookbook-item';

export const LookbookList = () => {
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetVoteById();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && !isFetching && !isFetchingNextPage && inView) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <Loader />;

  return (
    <div className='flex flex-1 flex-col gap-10'>
      {data?.votes.length == 0 && (
        <div className='flex flex-1 flex-col items-center justify-center'>
          <Text size='xl' ta='center' fw='700'>
            투표가 없습니다.
          </Text>
        </div>
      )}
      {data &&
        data?.votes.map((vote) => <LookbookItem key={vote.id} {...vote} />)}
      <div ref={ref}></div>
      {isFetchingNextPage && <Loader />}
    </div>
  );
};
