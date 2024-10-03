import api from '../app/axios';
import { ApiResponse, Post } from 'shared';
import { errorHandler } from './errorHandler';
import { TPost } from '../types/post';

const getAllPostsBase = () => api.get<ApiResponse<Post[]>>('post');
const createPostBase = (data: TPost) =>
  api.post<ApiResponse<Post>>('post', data);

const getAllPostsApi = errorHandler(getAllPostsBase);
const createPostApi = errorHandler(createPostBase);

export { createPostApi, getAllPostsApi };
