import api from '../app/axios';
import z from 'zod';
import { UserSignUp, UserLogIn } from 'shared';
import {
  LoginResponse,
  LogOutResponse,
  SignUpResponse,
} from '../types/api/auth';

type TUserSignUp = z.infer<typeof UserSignUp>;
type TUserLogin = z.infer<typeof UserLogIn>;

// API functions
const loginApi = async (data: TUserLogin) =>
  await api.post<LoginResponse>('auth/login', data);
const signupApi = async (data: TUserSignUp) =>
  await api.post<SignUpResponse>('auth/signup', data);
const logoutApi = async () => await api.post<LogOutResponse>('auth/logout');

export { loginApi, signupApi, logoutApi };
