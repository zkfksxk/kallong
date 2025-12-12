const queryKeys = {
  REMOVE_BACKGROUND: 'removeBackground',
  GET_LOOKBOOK: (id: string) => `getAnswerById-${id}`,
  CHECK_LOOKBOOK_LIKED: (id: string) => `checkLookbookLiked-${id}`,
  PROFILE: {
    ALL: ['profile'],
    LIST: ['profile', 'list'],
    GET_BYID: (userId: string) => ['profile', 'byId', userId],
  },
};
export default queryKeys;
