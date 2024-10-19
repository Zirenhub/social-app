const queryKeys = {
  profile: (username: string) => ['profile', username],
  profilePosts: (username: string) => ['profile-posts', username],
  profileFriendships: (username: string) => ['profile-friendships', username],
  allFriendRequests: ['friend-requests'],

  posts: ['posts'],
};

export default queryKeys;
