import api from '../app/axios';
import z from 'zod';
import { UserSignUp, UserLogIn, ApiResponse, TAuthUser } from 'shared';
import { LogOutResponse } from '../types/api/auth';
import { errorHandler } from './errorHandler';

type TLogInData = z.infer<typeof UserLogIn>;
type TSignUpData = z.infer<typeof UserSignUp>;

// API functions
const whoAmIBase = () => api.get<ApiResponse<TAuthUser>>('auth/whoami');

const logInApiBase = (data: TLogInData) =>
  api.post<ApiResponse<TAuthUser>>('auth/login', data);

const signupApiBase = (data: TSignUpData) =>
  api.post<ApiResponse<TAuthUser>>('auth/signup', data);

const whoAmiApi = errorHandler(whoAmIBase);
const logInApi = errorHandler(logInApiBase);
const signupApi = errorHandler(signupApiBase);

const logoutApi = async () => await api.post<LogOutResponse>('auth/logout');

export { whoAmiApi, logInApi, signupApi, logoutApi };
