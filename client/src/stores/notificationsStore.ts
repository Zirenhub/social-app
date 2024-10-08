import { create } from 'zustand';
import { useQuery } from '@tanstack/react-query';
import { ApiError } from '../api/error';
import { devtools } from 'zustand/middleware';
import { TFriendRequestApi } from 'shared';
import { getFriendshipRequestsApi } from '../api/profileApi';

type TNotificationsStore = {
  friendRequests: TFriendRequestApi[];
  setFriendRequests: (requests: TFriendRequestApi[]) => void;
};

const useNotificationsStore = create<TNotificationsStore>()(
  devtools((set) => ({
    friendRequests: [],
    setFriendRequests: (requests: TFriendRequestApi[]) =>
      set({ friendRequests: requests }),
  }))
);

export const useFriendRequestsQuery = () => {
  return useQuery<TFriendRequestApi[], ApiError>({
    queryKey: ['notif-friend-request'],
    queryFn: getFriendshipRequestsApi,
    retry: false,
  });
};

export default useNotificationsStore;
