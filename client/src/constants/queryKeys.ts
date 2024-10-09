const queryKeys = {
  profile: (username: string) => ['profile', username],
  allFriendRequests: ['friend-requests'],
  postFriendshipRequest: (username: string) => [
    'post-friend-request',
    username,
  ],
  deleteFriendshipRequest: (username: string) => [
    'delete-friend-request',
    username,
  ],

  posts: ['posts'],
};

export default queryKeys;
