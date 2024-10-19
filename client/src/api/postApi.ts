import api from '../app/axios';
import { ApiResponse, TPostApi } from 'shared';
import { errorHandler } from './errorHandler';
import { TPost } from '../types/post';

const getAllPostsBase = () => api.get<ApiResponse<TPostApi[]>>('post');

const createPostBase = (data: TPost) =>
  api.post<ApiResponse<TPostApi>>('post', data);

const getProfilePostsBase = (username: string) =>
  api.get<ApiResponse<TPostApi[]>>(`/post/${username}`);

const getAllPostsApi = errorHandler(getAllPostsBase);
const createPostApi = errorHandler(createPostBase);
const getProfilePostsApi = errorHandler(getProfilePostsBase);

export { createPostApi, getAllPostsApi, getProfilePostsApi };
