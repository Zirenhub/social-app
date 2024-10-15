import { FriendRequest, Friendship, TProfileBase } from "@shared";

type TGetProfile = TProfileBase & {
  friendsAdded: Friendship[];
  friendOf: Friendship[];
  sentRequests: FriendRequest[];
  receivedRequests: FriendRequest[];
};

export { TGetProfile };
