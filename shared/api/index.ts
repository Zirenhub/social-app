import type { ApiResponse } from "./apiResponse";
import { User, Profile, Post, Like, Comment } from "../types";

type TAuthUserApi = Omit<User, "passwordHash"> & { profile: Profile };
type TProfileApi = Omit<Profile, "userId">;
type TPostApi = Post & {
  profile: Omit<Profile, "userId">;
  likes: Like[];
  comments: Comment[];
};

export { ApiResponse, TAuthUserApi, TProfileApi, TPostApi };
