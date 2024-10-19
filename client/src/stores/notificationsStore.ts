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
    mutationKey: ['notifications', 'reject'],
    mutationFn: deleteFriendshipRequestApi,
    onSuccess: (data) => {
      queryClient.setQueryData(
        queryKeys.allFriendRequests,
        (oldData: TFriendRequestApi[]) => {
          return oldData.filter((req) => {
            // remove the request that has the senderId as the rejected profile's id
            return req.senderId !== data.id;
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
