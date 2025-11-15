const queryKeys = {
  REMOVE_BACKGROUND: 'removeBackground',
  GET_LOOKBOOK: (id: string) => `getAnswerById-${id}`,
  LOOKBOOK_LIKED: (id: string) => `checkLookbookLiked-${id}`,
};

export default queryKeys;
