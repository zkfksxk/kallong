const queryKeys = {
  profile: {
    all: ['profile'] as const,
    details: () => [...queryKeys.profile.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.profile.details(), id] as const,
  },
  removeBackground: {
    all: ['removeBackground'] as const,
  },
  lookbook: {
    all: ['lookbook'] as const,
    details: () => [...queryKeys.lookbook.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.lookbook.details(), id] as const,
    liked: (id: string) => [...queryKeys.lookbook.detail(id), 'liked'] as const,
  },
  vote: {
    all: ['vote'] as const,
    lists: () => [...queryKeys.vote.all, 'list'] as const,
    list: () => [...queryKeys.vote.lists()] as const,
  },
  outfit: {
    all: ['outfit'] as const,
    month: () => [...queryKeys.outfit.all, 'month'] as const,
    inMonth: (day: string) => [...queryKeys.outfit.month(), day] as const,
    details: () => [...queryKeys.outfit.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.outfit.details(), id] as const,
  },
};
export default queryKeys;
