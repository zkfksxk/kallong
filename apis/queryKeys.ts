const queryKeys = {
  REMOVE_BACKGROUND: 'removeBackground',
  GET_LOOKBOOK: (id: string) => `getAnswerById-${id}`,
  CHECK_LOOKBOOK_LIKED: (id: string) => `checkLookbookLiked-${id}`,
  GET_USER: 'getUser',
};

export default queryKeys;
