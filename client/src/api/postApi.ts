import api from '../app/axios';
import { ApiResponse, TPostApi } from 'shared';
import { errorHandler } from './errorHandler';
import { TPost } from '../types/post';

const getAllPostsBase = () => api.get<ApiResponse<TPostApi[]>>('post');
const createPostBase = (data: TPost) =>
  api.post<ApiResponse<TPostApi>>('post', data);

const getAllPostsApi = errorHandler(getAllPostsBase);
const createPostApi = errorHandler(createPostBase);

export { createPostApi, getAllPostsApi };
