import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../api/error';
import { TFriendRequestApi } from 'shared';
import {
  deleteFriendshipRequestApi,
  getFriendshipRequestsApi,
} from '../api/profileApi';
import queryKeys from '../constants/queryKeys';

export const useFriendRequestsQuery = () => {
  return useQuery<TFriendRequestApi[], ApiError>({
    queryKey: queryKeys.allFriendRequests,
    queryFn: getFriendshipRequestsApi,
    retry: false,
  });
};

export const useRejectRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['notifications'],
    mutationFn: deleteFriendshipRequestApi,
    onSuccess: (data) => {
      queryClient.setQueryData(
        queryKeys.allFriendRequests,
        (oldData: TFriendRequestApi[]) => {
          return oldData.filter((req) => {
            return req.id !== data.friendshipStatus.requestId;
          });
        }
      );
      queryClient.setQueryData(queryKeys.profile(data.username), data);
    },
    onError: (err: ApiError) => {
      console.error(err.message);
    },
  });
};
