import type { ApiResponse } from "./apiResponse";
import { User, Profile } from "../types";

type TAuthUser = Omit<User, "passwordHash"> & { profile: Profile };
type TProfile = Omit<Profile, "userId">;

export { ApiResponse, TAuthUser, TProfile };
