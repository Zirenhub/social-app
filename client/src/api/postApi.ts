import api from '../app/axios';
import { ApiResponse, TPostApi } from 'shared';
import { errorHandler } from './errorHandler';
import { TPost } from '../types/post';

const getAllPostsBase = () => api.get<ApiResponse<TPostApi[]>>('posts');

const getPostBase = ({
  username,
  postId,
}: {
  username: string;
  postId: string;
}) => api.get<ApiResponse<TPostApi>>(`posts/${username}/${postId}`);

const getProfilePostsBase = (username: string) =>
  api.get<ApiResponse<TPostApi[]>>(`posts/${username}`);

const createPostBase = (data: TPost) =>
  api.post<ApiResponse<TPostApi>>('posts', data);

const createPostLikeBase = (postId: number) =>
  api.post<ApiResponse<TPostApi>>(`posts/like/${postId}`);

const getAllPostsApi = errorHandler(getAllPostsBase);
const getProfilePostsApi = errorHandler(getProfilePostsBase);
const getPostApi = errorHandler(getPostBase);
const createPostApi = errorHandler(createPostBase);
const createPostLikeApi = errorHandler(createPostLikeBase);

export {
  createPostApi,
  getAllPostsApi,
  getProfilePostsApi,
  getPostApi,
  createPostLikeApi,
};
