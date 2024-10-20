import type { ApiResponse } from "./apiResponse";
import {
  User,
  Profile,
  Post,
  Like,
  Comment,
  FriendRequest,
  Friendship,
} from "../types";

type TFriendshipStatus = {
  status: "NOT_FRIENDS" | "FRIENDS" | "REQUEST_SENT" | "RECEIVED_REQUEST";
  requestId: number | null;
};

type TProfileBase = Omit<Profile, "userId">;
type TProfileApi = TProfileBase & { friendshipStatus: TFriendshipStatus };
type TProfileFriendships = Omit<Friendship, "profileId" | "friendId"> & {
  profile: TProfileBase;
};

type TAuthUserApi = Omit<User, "passwordHash"> & { profile: Profile };
type TPostApi = Post & {
  profile: TProfileApi;
  likes: Like[];
  comments: Comment[];
};
type TFriendRequestApi = FriendRequest & { sender: TProfileApi };

export {
  ApiResponse,
  TAuthUserApi,
  TProfileApi,
  TProfileFriendships,
  TPostApi,
  TFriendRequestApi,
  TProfileBase,
  TFriendshipStatus,
};
