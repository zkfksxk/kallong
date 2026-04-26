import { useInfiniteQuery } from '@tanstack/react-query';
import { VoteRes, getVoteById } from '../actions/lookbook';
import queryKeys from '../queryKeys';

const PAGE_SIZE = 5;

export function useGetVoteById() {
  return useInfiniteQuery({
    queryKey: queryKeys.vote.lists(),
    queryFn: async ({ pageParam }) => {
      const from = pageParam;
      const to = from + PAGE_SIZE - 1;

      return await getVoteById({ from, to });
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data || lastPage.data.length < PAGE_SIZE) return undefined;
      const nextOffset = allPages.flatMap((p) => p.data).length;
      return nextOffset;
    },
    select: (data): { votes: VoteRes[]; totalCount: number } => ({
      votes: data.pages.flatMap((page) => page.data), // 모든 투표를 하나의 배열로
      totalCount: data.pages[0]?.count || 0,
    }),
  });
}
