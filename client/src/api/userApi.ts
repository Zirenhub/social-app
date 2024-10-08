import api from '../app/axios';
import { ApiResponse, TAuthUserApi } from 'shared';
import { errorHandler } from './errorHandler';
import { TLogInData, TSignUpData } from '../types/user';

// API functions
const whoAmIBase = () => api.get<ApiResponse<TAuthUserApi>>('auth/whoami');

const logInApiBase = (data: TLogInData) =>
  api.post<ApiResponse<TAuthUserApi>>('auth/login', data);

const signupApiBase = (data: TSignUpData) =>
  api.post<ApiResponse<TAuthUserApi>>('auth/signup', data);

const logoutApiBase = () => api.post<ApiResponse<null>>('auth/logout');

const whoAmiApi = errorHandler(whoAmIBase);
const logInApi = errorHandler(logInApiBase);
const signupApi = errorHandler(signupApiBase);
const logoutApi = errorHandler(logoutApiBase);

export { whoAmiApi, logInApi, signupApi, logoutApi };
