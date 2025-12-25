const queryKeys = {
  REMOVE_BACKGROUND: 'removeBackground',
  GET_LOOKBOOK: (id: string) => `getLookbookById-${id}`,
  CHECK_LOOKBOOK_LIKED: (id: string) => `checkLookbookLiked-${id}`,
  PROFILE: {
    ALL: ['profile'],
    LIST: ['profile', 'list'],
    GET_BYID: (userId: string) => ['profile', 'byId', userId],
  },
  VOTE: {
    ALL: ['vote'],
    LIST: ['vote', 'list'],
  },
};
export default queryKeys;
