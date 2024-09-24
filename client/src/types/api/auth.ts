import { ApiResponse, Profile, User } from '@shared/index';

export interface LoginResponse extends ApiResponse<unknown> {
  data: Omit<User, 'passwordHash'> & { profile: Profile };
}

export interface SignUpResponse extends ApiResponse<unknown> {
  data: Omit<User, 'passwordHash'> & { profile: Profile };
}

export interface LogOutResponse extends ApiResponse<unknown> {
  success: true;
  data: null;
  error: null;
}
