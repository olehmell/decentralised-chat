export const keyBuilder = {
  getCommentIdsByPostIdKey: (postId: string) => (['commentIds-by-postId', postId] as const),
  getPostIdKey: (postId: string) => (['post', postId] as const),
}