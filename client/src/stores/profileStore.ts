import { useMutation, useQuery } from '@tanstack/react-query';
import { TFriendshipStatus, TProfileApi } from 'shared';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  deleteFriendshipRequestApi,
  getProfileApi,
  postFriendshipRequestApi,
} from '../api/profileApi';
import { ApiError } from '../api/error';

type TProfileStore = {
  profile: TProfileApi | null;
  isMyProfile: boolean;
  setProfile: (profile: TProfileApi, currentUsername: string) => void;
  setFriendshipStatus: (friendRequest: TFriendshipStatus) => void;
};

const useProfileStore = create<TProfileStore>()(
  devtools((set) => ({
    profile: null,
    isMyProfile: false,
    setProfile: (profile: TProfileApi, currentUsername: string) =>
      set({
        profile,
        isMyProfile: profile.username === currentUsername,
      }),
    setFriendshipStatus: (friendshipStatus: TFriendshipStatus) =>
      set((state) => ({
        profile: state.profile ? { ...state.profile, friendshipStatus } : null,
      })),
  }))
);

export const useProfileQuery = (username: string) => {
  return useQuery<TProfileApi, ApiError>({
    queryKey: ['profile', username],
    queryFn: () => getProfileApi(username),
    retry: false,
  });
};

export const useFriendshipRequestMutation = (
  username: string,
  successCallback: () => void,
  errorCallback: (errorMsg: string) => void
) => {
  const { setFriendshipStatus } = useProfileStore();

  return useMutation({
    mutationKey: ['profile', username],
    mutationFn: () => postFriendshipRequestApi(username),
    onSuccess(data) {
      setFriendshipStatus({ status: 'RECEIVED_REQUEST', requestId: data.id });
      successCallback();
    },
    onError(err) {
      console.log(err);
      errorCallback(err.message);
    },
  });
};

export const useDeleteFriendshipRequestMutation = (
  username: string,
  successCallback: () => void,
  errorCallback: (errorMsg: string) => void
) => {
  const { setFriendshipStatus } = useProfileStore();

  return useMutation({
    mutationKey: ['profile', username],
    mutationFn: () => deleteFriendshipRequestApi(username),
    onSuccess() {
      setFriendshipStatus({ status: 'NOT_FRIENDS', requestId: null });
      successCallback();
    },
    onError(err) {
      console.log(err);
      errorCallback(err.message);
    },
  });
};

export default useProfileStore;
