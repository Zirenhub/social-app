export * from "./validation/userSchemas";
export * from "./types/prisma";
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: {
    message: string;
    details?: any;
  } | null;
}
