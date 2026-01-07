'use client';

import { useEffect } from 'react';
import { Text } from '@mantine/core';
import { useInView } from 'react-intersection-observer';
import { useGetVoteById } from '@/apis/querys/useGetVoteById';
import { LookbookItem } from './lookbook-item';

export const LookbookList = () => {
  const { data, fetchNextPage } = useGetVoteById();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  console.log('data', data);
  return (
    <div className='flex flex-1 flex-col gap-10 border'>
      {!data ||
        (data?.votes.length == 0 && (
          <div>
            <Text ta='center'>투표가 없습니다.</Text>
          </div>
        ))}
      {data &&
        data?.votes.map((vote) => <LookbookItem key={vote.id} {...vote} />)}
      <div ref={ref}></div>
    </div>
  );
};
