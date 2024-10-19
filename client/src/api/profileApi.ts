import { ApiResponse, TFriendRequestApi, TPostApi, TProfileApi } from 'shared';
import api from '../app/axios';
import { errorHandler } from './errorHandler';

const getProfileBase = (username: string) =>
  api.get<ApiResponse<TProfileApi>>(`profile/${username}`);

const postFriendshipRequestBase = (username: string) =>
  api.post<ApiResponse<TProfileApi>>(`/profile/${username}/friend-requests`);

const deleteFriendshipRequestBase = (username: string) =>
  api.delete<ApiResponse<TProfileApi>>(`/profile/${username}/friend-requests`);

const getFriendshipRequestsBase = () =>
  api.get<ApiResponse<TFriendRequestApi[]>>(`/profile/friend-requests`);

const acceptFriendshipRequestBase = (username: string) =>
  api.put<ApiResponse<TProfileApi>>(`/profile/${username}/friend-requests`);

const deleteFriendshipBase = (username: string) =>
  api.delete<ApiResponse<TProfileApi>>(`/profile/${username}/friendship`);

const getProfilePostsBase = (username: string) =>
  api.get<ApiResponse<TPostApi[]>>(`/post/${username}`);

const getProfileApi = errorHandler(getProfileBase);
const postFriendshipRequestApi = errorHandler(postFriendshipRequestBase);
const deleteFriendshipRequestApi = errorHandler(deleteFriendshipRequestBase);
const getFriendshipRequestsApi = errorHandler(getFriendshipRequestsBase);
const acceptFriendshipRequestApi = errorHandler(acceptFriendshipRequestBase);
const deleteFriendshipApi = errorHandler(deleteFriendshipBase);
const getProfilePostsApi = errorHandler(getProfilePostsBase);

export {
  getProfileApi,
  postFriendshipRequestApi,
  deleteFriendshipRequestApi,
  getFriendshipRequestsApi,
  acceptFriendshipRequestApi,
  deleteFriendshipApi,
  getProfilePostsApi,
};
