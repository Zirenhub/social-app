import type { ApiResponse } from "./apiResponse";
import { User, Profile, Post, Like, Comment } from "../types";

type TAuthUserApi = Omit<User, "passwordHash"> & { profile: Profile };
type TPostApi = Post & {
  profile: Omit<Profile, "userId">;
  likes: Like[];
  comments: Comment[];
};

type EFriendshipStatus =
  | "FRIENDS"
  | "RECEIVED_REQUEST"
  | "SENT_REQUEST"
  | "NOT_FRIENDS";

type TFriendshipStatus = {
  status: EFriendshipStatus;
  requestId: number | null;
};

type TProfileApi = Omit<Profile, "userId"> & {
  friendshipStatus: TFriendshipStatus;
};

export { ApiResponse, TAuthUserApi, TProfileApi, TPostApi, TFriendshipStatus };
