'use client';

import { useEffect } from 'react';
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

  return (
    <div className='flex flex-col gap-10'>
      {data &&
        data?.votes.map((vote) => <LookbookItem key={vote.id} {...vote} />)}
      <div ref={ref}></div>
    </div>
  );
};
