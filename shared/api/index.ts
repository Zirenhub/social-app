import type { ApiResponse } from "./apiResponse";
import { User, Profile } from "../types";

type TAuthUser = Omit<User, "passwordHash"> & { profile: Profile };

export { ApiResponse, TAuthUser };
