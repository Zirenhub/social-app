import type { ApiResponse } from "./apiResponse";
import { User, Profile, Post, Like, Comment, FriendRequest } from "../types";

type TProfileBase = Omit<Profile, "userId">;
type EFriendshipStatus =
  | "FRIENDS"
  | "RECEIVED_REQUEST"
  | "SENT_REQUEST"
  | "NOT_FRIENDS";
type TFriendshipStatus = {
  status: EFriendshipStatus;
  requestId: number | null;
};

// types of the responses, responded by api
type TAuthUserApi = Omit<User, "passwordHash"> & { profile: Profile };
type TPostApi = Post & {
  profile: TProfileBase;
  likes: Like[];
  comments: Comment[];
};
type TProfileApi = Omit<Profile, "userId"> & {
  friendshipStatus: TFriendshipStatus;
};
type TFriendRequestApi = FriendRequest & { sender: TProfileBase };

export {
  ApiResponse,
  TAuthUserApi,
  TProfileApi,
  TPostApi,
  TFriendshipStatus,
  TFriendRequestApi,
};
