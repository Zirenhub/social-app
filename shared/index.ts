export * from "./validation/userSchemas";
export type { Profile, User } from "./types/prisma";
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: {
    message: string;
    details?: any;
  } | null;
}
