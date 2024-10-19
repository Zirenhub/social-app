import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  acceptFriendshipRequestApi,
  deleteFriendshipApi,
  deleteFriendshipRequestApi,
  getProfileApi,
  getProfileFriendshipsApi,
  postFriendshipRequestApi,
} from '../api/profileApi';
import { getProfilePostsApi } from '../api/postApi';
import { ApiError } from '../api/error';
import queryKeys from '../constants/queryKeys';
import { TPostApi, TProfileApi } from 'shared';

type TProfileStore = {
  isMyProfile: boolean;
  setIsMyProfile: (isMyProfile: boolean) => void;
};
type TMutations = {
  onSuccess: () => void;
  onError: (errMsg: string) => void;
};

const useProfileStore = create<TProfileStore>()(
  devtools((set) => ({
    isMyProfile: false,
    setIsMyProfile: (isMyProfile: boolean) => set({ isMyProfile }),
  }))
);

// Queries

export const useProfileQuery = (username: string) => {
  return useQuery<TProfileApi, ApiError>({
    queryKey: queryKeys.profile(username),
    queryFn: () => getProfileApi(username),
    retry: false,
  });
};

export const useProfilePostsQuery = (username: string) => {
  return useQuery<TPostApi[], ApiError>({
    queryKey: queryKeys.profilePosts(username),
    queryFn: () => getProfilePostsApi(username),
    retry: false,
  });
};

export const useProfileFriendshipsQuery = (username: string) => {
  return useQuery({
    queryKey: queryKeys.profileFriendships(username),
    queryFn: () => getProfileFriendshipsApi(username),
    retry: false,
  });
};

export const useFriendshipRequestMutation = ({
  onSuccess,
  onError,
}: TMutations) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postFriendshipRequestApi,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.profile(data.username), data);
      onSuccess();
    },
    onError: (err: ApiError) => {
      console.error(err.message);
      onError(err.message);
    },
  });
};

export const useDeleteFriendshipRequestMutation = ({
  onSuccess,
  onError,
}: TMutations) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFriendshipRequestApi,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.profile(data.username), data);
      onSuccess();
    },
    onError: (err: ApiError) => {
      console.error(err.message);
      onError(err.message);
    },
  });
};

export const useAcceptFriendshipRequestMutation = ({
  onSuccess,
  onError,
}: TMutations) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptFriendshipRequestApi,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.profile(data.username), data);
      onSuccess();
    },
    onError: (err: ApiError) => {
      console.error(err.message);
      onError(err.message);
    },
  });
};

export const useDeleteFriendshipMutation = ({
  onSuccess,
  onError,
}: TMutations) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFriendshipApi,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.profile(data.username), data);
      onSuccess();
    },
    onError: (err: ApiError) => {
      console.error(err.message);
      onError(err.message);
    },
  });
};

export default useProfileStore;
