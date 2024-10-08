import {
  ApiResponse,
  FriendRequest,
  TFriendRequestApi,
  TProfileApi,
} from 'shared';
import api from '../app/axios';
import { errorHandler } from './errorHandler';

const getProfileBase = (username: string) =>
  api.get<ApiResponse<TProfileApi>>(`profile/${username}`);
const postFriendshipRequestBase = (username: string) =>
  api.post<ApiResponse<FriendRequest>>(`/profile/${username}/friend-request`);
const deleteFriendshipRequestBase = (username: string) =>
  api.delete<ApiResponse<null>>(`/profile/${username}/friend-request`);
const getFriendshipRequestsBase = () =>
  api.get<ApiResponse<TFriendRequestApi[]>>(`/profile/friend-request`);

const getProfileApi = errorHandler(getProfileBase);
const postFriendshipRequestApi = errorHandler(postFriendshipRequestBase);
const deleteFriendshipRequestApi = errorHandler(deleteFriendshipRequestBase);
const getFriendshipRequestsApi = errorHandler(getFriendshipRequestsBase);

export {
  getProfileApi,
  postFriendshipRequestApi,
  deleteFriendshipRequestApi,
  getFriendshipRequestsApi,
};
