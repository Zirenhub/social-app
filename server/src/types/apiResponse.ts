export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: {
    message: string;
    details?: any;
  } | null;
}
