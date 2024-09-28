import api from '../app/axios';
import z from 'zod';
import { UserSignUp, UserLogIn, ApiResponse } from 'shared';
import {
  LoginResponse,
  LogOutResponse,
  SignUpResponse,
} from '../types/api/auth';
import { errorHandler } from './errorHandler';

type TUserSignUp = z.infer<typeof UserSignUp>;
type TUserLogin = z.infer<typeof UserLogIn>;

// API functions
const loginApi = async (loginData: TUserLogin) => {
  const response = await api.post<LoginResponse>('auth/login', loginData);
  return response.data;
};

const signupApiBase = (data: TUserSignUp) =>
  api.post<ApiResponse<SignUpResponse>>('auth/signup', data);
const signupApi = errorHandler(signupApiBase);

const logoutApi = async () => await api.post<LogOutResponse>('auth/logout');

export { loginApi, signupApi, logoutApi };
