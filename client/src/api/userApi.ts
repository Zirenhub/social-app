import api from '../app/axios';
import z from 'zod';
import { UserSignUp, UserLogIn, ApiResponse } from 'shared';
import {
  LoginResponse,
  LogOutResponse,
  SignUpResponse,
} from '../types/api/auth';
import { errorHandler } from './errorHandler';

type TLogInData = z.infer<typeof UserLogIn>;
type TSignUpData = z.infer<typeof UserSignUp>;

// API functions
const logInApiBase = (data: TLogInData) =>
  api.post<ApiResponse<LoginResponse>>('auth/login', data);

const signupApiBase = (data: TSignUpData) =>
  api.post<ApiResponse<SignUpResponse>>('auth/signup', data);

const logInApi = errorHandler(logInApiBase);
const signupApi = errorHandler(signupApiBase);

const logoutApi = async () => await api.post<LogOutResponse>('auth/logout');

export { logInApi, signupApi, logoutApi };
