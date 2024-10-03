import { ApiResponse, TProfileApi } from 'shared';
import api from '../app/axios';
import { errorHandler } from './errorHandler';

const getProfileBase = (username: string) =>
  api.get<ApiResponse<TProfileApi>>(`profile/${username}`);

const getProfileApi = errorHandler(getProfileBase);

export { getProfileApi };
