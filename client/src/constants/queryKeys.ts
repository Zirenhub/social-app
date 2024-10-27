const queryKeys = {
  profile: (username: string) => ['profile', username],
  profileFriendships: (username: string) => ['profile-friendships', username],
  profileLikes: (username: string) => ['profile-likes', username],
  allFriendRequests: ['friend-requests'],

  posts: ['posts'],
  profilePosts: (username: string) => ['posts', 'profile', username],
  post: (postId: number) => ['posts', postId],
};

export default queryKeys;
