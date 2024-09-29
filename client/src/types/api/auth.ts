import { ApiResponse, TAuthUser } from 'shared';

export interface LoginResponse extends ApiResponse<unknown> {
  data: TAuthUser;
}

export interface SignUpResponse extends ApiResponse<unknown> {
  data: TAuthUser;
}

export interface LogOutResponse extends ApiResponse<unknown> {
  success: true;
  data: null;
  error: null;
}
