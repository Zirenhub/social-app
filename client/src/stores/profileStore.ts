import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  acceptFriendshipRequestApi,
  deleteFriendshipApi,
  deleteFriendshipRequestApi,
  getProfileApi,
  getProfileFriendshipsApi,
  postFriendshipRequestApi,
  updateProfileApi,
} from '../api/profileApi';
import { getProfileLikesApi, getProfilePostsApi } from '../api/postApi';
import { ApiError } from '../api/error';
import queryKeys from '../constants/queryKeys';
import { TAuthUserApi, TFriendRequestApi, TPostApi, TProfileApi } from 'shared';
import { TMutations } from '../types/store';

type TProfileStore = {
  profile: TProfileApi | null;
  isMyProfile: boolean;
  setProfile: (profile: TProfileApi, user: TAuthUserApi) => void;
};

const useProfileStore = create<TProfileStore>()(
  devtools((set) => ({
    profile: null,
    isMyProfile: false,
    setProfile: (profile: TProfileApi, user: TAuthUserApi) =>
      set({
        profile,
        isMyProfile: profile.id === user.profile.id,
      }),
  }))
);

// Helpers

export const handleRemoveNotification = (
  data: TProfileApi,
  queryClient: QueryClient
) => {
  queryClient.setQueryData(
    queryKeys.allFriendRequests,
    (oldData: TFriendRequestApi[]) => {
      return oldData.filter((req) => {
        // remove the request that has the senderId as the rejected profile's id
        return req.senderId !== data.id;
      });
    }
  );
};

export const handleUpdateFriendships = (
  data: TProfileApi,
  profileUsername: string,
  queryClient: QueryClient
) => {
  queryClient.setQueryData(
    queryKeys.profileFriendships(profileUsername),
    (oldData: TProfileApi[] = []) => {
      return oldData.map((friend) => (friend.id === data.id ? data : friend));
    }
  );
};

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
  return useQuery<TProfileApi[], ApiError>({
    queryKey: queryKeys.profileFriendships(username),
    queryFn: () => getProfileFriendshipsApi(username),
    retry: false,
  });
};

export const useProfileLikesQuery = (username: string) => {
  return useQuery<TPostApi[], ApiError>({
    queryKey: queryKeys.profileLikes(username),
    queryFn: () => getProfileLikesApi(username),
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
      if (onSuccess) onSuccess(data);
    },
    onError: (err: ApiError) => {
      console.error(err.message);
      if (onError) onError(err.message);
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
      if (onSuccess) onSuccess(data);
    },
    onError: (err: ApiError) => {
      console.error(err.message);
      if (onError) onError(err.message);
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
      if (onSuccess) onSuccess(data);
    },
    onError: (err: ApiError) => {
      console.error(err.message);
      if (onError) onError(err.message);
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
      if (onSuccess) onSuccess(data);
    },
    onError: (err: ApiError) => {
      console.error(err.message);
      if (onError) onError(err.message);
    },
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile(data.username),
      });
    },
  });
};

export default useProfileStore;
