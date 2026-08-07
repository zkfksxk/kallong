import { useInfiniteQuery } from '@tanstack/react-query';
import { getVoteById } from '@/apis/actions/lookbook';
import queryKeys from '@/apis/queryKeys';
import { VoteWithLookbook } from '@/apis/types/lookbook';

const PAGE_SIZE = 5;

export function useGetVoteById(voteName?: string, lookbookName?: string) {
  return useInfiniteQuery({
    queryKey: queryKeys.vote.lists(),
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      return await getVoteById({
        from: pageParam,
        to: pageParam + PAGE_SIZE - 1,
        voteName,
        lookbookName,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data || lastPage.data.length < PAGE_SIZE) return undefined;
      const nextOffset = allPages.flatMap((p) => p.data).length;
      return nextOffset;
    },
    select: (data): { votes: VoteWithLookbook[]; totalCount: number } => ({
      votes: data.pages.flatMap((page) => page.data),
      totalCount: data.pages[0]?.count || 0,
    }),
  });
}
