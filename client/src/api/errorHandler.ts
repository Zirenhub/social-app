import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiError } from './error';
import { ApiResponse } from 'shared';

type ApiFunction<T, R> = (data: T) => Promise<AxiosResponse<ApiResponse<R>>>;

export const errorHandler = <T, R>(apiFunction: ApiFunction<T, R>) => {
  return async (data: T): Promise<R> => {
    try {
      const response = await apiFunction(data);
      if (response.data.success) {
        return response.data as R;
      } else {
        throw new ApiError(
          response.data.error?.message || 'Unknown error',
          response.status,
          response.data.error?.details
        );
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse<R>>;
        throw new ApiError(
          axiosError.response?.data?.error?.message || axiosError.message,
          axiosError.response?.status || 500,
          axiosError.response?.data?.error?.details
        );
      } else {
        throw new ApiError('An unexpected error occurred', 500);
      }
    }
  };
};
