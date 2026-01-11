const queryKeys = {
  REMOVE_BACKGROUND: 'removeBackground',
  GET_LOOKBOOK: (id: string) => `getLookbookById-${id}`,
  CHECK_LOOKBOOK_LIKED: (id: string) => `checkLookbookLiked-${id}`,
  PROFILE: {
    GET_BYID: ['get_profile_byId'],
  },
  VOTE: {
    ALL: ['vote'],
    LIST: ['vote', 'list'],
  },
};
export default queryKeys;
