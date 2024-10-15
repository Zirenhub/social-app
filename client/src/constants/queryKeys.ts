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
  acceptFriendshipRequst: (username: string) => [
    'accept-friend-request',
    username,
  ],
  deleteFriendship: (username: string) => ['delete-friendship', username],

  posts: ['posts'],
};

export default queryKeys;
