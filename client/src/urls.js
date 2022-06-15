export const postUrl = 'http://localhost:4000/posts'
export const fetchPostsUrl = 'http://localhost:4002/posts'
export const commentUrl = (postId) => `http://localhost:4001/posts/${postId}/comments`