import { useQuery } from '@tanstack/react-query';
import { ApiError } from '../api/error';
import { TFriendRequestApi } from 'shared';
import { getFriendshipRequestsApi } from '../api/profileApi';
import queryKeys from '../constants/queryKeys';

export const useFriendRequestsQuery = () => {
  return useQuery<TFriendRequestApi[], ApiError>({
    queryKey: queryKeys.allFriendRequests,
    queryFn: getFriendshipRequestsApi,
    retry: false,
  });
};
