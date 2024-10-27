import { FriendRequest, Friendship, TProfileBase } from "@shared";

type TProfileWithRelations = TProfileBase & {
  friendsAdded: Friendship[];
  friendOf: Friendship[];
  sentRequests: FriendRequest[];
  receivedRequests: FriendRequest[];
};

export { TProfileWithRelations };
