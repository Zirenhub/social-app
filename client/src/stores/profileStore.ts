import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  acceptFriendshipRequestApi,
  deleteFriendshipApi,
  deleteFriendshipRequestApi,
  getProfileApi,
  postFriendshipRequestApi,
} from '../api/profileApi';
import { ApiError } from '../api/error';
import queryKeys from '../constants/queryKeys';
import { TProfileApi } from 'shared';

type TProfileStore = {
  isMyProfile: boolean;
  setIsMyProfile: (isMyProfile: boolean) => void;
};
type TMutations = {
  username: string;
  callbacks: { onSuccess: () => void; onError: (errMsg: string) => void };
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

export const useFriendshipRequestMutation = ({
  username,
  callbacks,
}: TMutations) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.postFriendshipRequest(username),
    mutationFn: () => postFriendshipRequestApi(username),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.profile(username), data);
      callbacks.onSuccess();
    },
    onError: (err: ApiError) => {
      console.error(err.message);
      callbacks.onError(err.message);
    },
  });
};

export const useDeleteFriendshipRequestMutation = ({
  username,
  callbacks,
}: TMutations) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.deleteFriendshipRequest(username),
    mutationFn: () => deleteFriendshipRequestApi(username),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.profile(username), data);
      callbacks.onSuccess();
    },
    onError: (err: ApiError) => {
      console.error(err.message);
      callbacks.onError(err.message);
    },
  });
};

export const useAcceptFriendshipRequestMutation = ({
  username,
  callbacks,
}: TMutations) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.acceptFriendshipRequst(username),
    mutationFn: () => acceptFriendshipRequestApi(username),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.profile(username), data);
      callbacks.onSuccess();
    },
    onError: (err: ApiError) => {
      console.error(err.message);
      callbacks.onError(err.message);
    },
  });
};

export const useDeleteFriendshipMutation = ({
  username,
  callbacks,
}: TMutations) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.deleteFriendship(username),
    mutationFn: () => deleteFriendshipApi(username),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.profile(username), data);
      callbacks.onSuccess();
    },
    onError: (err: ApiError) => {
      console.error(err.message);
      callbacks.onError(err.message);
    },
  });
};

export default useProfileStore;
