import ProfilePicture from '../profile/ProfilePicture';
import ProfileTitle from '../common/ProfileTitle';
import ProfileActionBtn from '../common/ProfileActionBtn';
import { motion } from 'framer-motion';
import { scaleVariants } from '../../constants/constants';
import IsLoading from '../IsLoading';
import ShowError from '../ShowError';
import { useFriendRequestsQuery } from '../../stores/notificationsStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFriendshipRequestApi } from '../../api/profileApi';
import { ApiError } from '../../api/error';
import queryKeys from '../../constants/queryKeys';

function Notifications() {
  const { data, isLoading, isError, error } = useFriendRequestsQuery();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['notifications-reject-request'],
    mutationFn: deleteFriendshipRequestApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.allFriendRequests });
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile(data.sender.username),
      });
    },
    onError: (err: ApiError) => {
      console.error(err.message);
    },
  });

  if (isLoading) return <IsLoading />;
  if (isError) return <ShowError message={error.message} />;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={scaleVariants}
      className="ml-2 basis-[25%] w-full"
    >
      {data?.length ? (
        data.map((request) => (
          <div
            key={request.id}
            className="flex flex-col p-3 w-full gap-2 bg-secondary/70 rounded-md shadow-md"
          >
            <div className="flex cursor-pointer gap-2">
              <ProfilePicture styles="h-12 w-12 flex-shrink-0" />
              <div className="flex flex-col text-sm whitespace-nowrap max-w-[160px]">
                <ProfileTitle
                  identifiers={{
                    firstName: request.sender.firstName,
                    lastName: request.sender.lastName,
                    username: request.sender.username,
                  }}
                  styles={{ names: 'text-primary', username: 'text-primary' }}
                />
                <p className="text-primary truncate">wants to be friends!</p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <ProfileActionBtn
                label="Accept"
                className="bg-green-400 hover:bg-blue-400"
              />
              <ProfileActionBtn
                label="Delete"
                className="bg-red-400 hover:bg-red-500"
                onClick={() => mutation.mutate(request.sender.username)}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="whitespace-nowrap p-3 text-third font-bold text-center">
          Nothing to show!
        </p>
      )}
    </motion.div>
  );
}

export default Notifications;
