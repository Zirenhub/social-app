import api from '../app/axios';
import z from 'zod';
import { UserSignUp, UserLogIn } from '@shared/index';
import {
  LoginResponse,
  LogOutResponse,
  SignUpResponse,
} from '../types/api/auth';

type TUserSignUp = z.infer<typeof UserSignUp>;
type TUserLogin = z.infer<typeof UserLogIn>;

// API functions
const loginApi = (data: TUserLogin) =>
  api.post<LoginResponse>('/auth/login', data);
const signupApi = (data: TUserSignUp) =>
  api.post<SignUpResponse>('/auth/signup', data);
const logoutApi = () => api.post<LogOutResponse>('/logout');

export { loginApi, signupApi, logoutApi };
