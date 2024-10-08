import { useEffect } from 'react';
import useNotificationsStore, {
  useFriendRequestsQuery,
} from '../../stores/notificationsStore';
import ProfilePicture from '../profile/ProfilePicture';
import ProfileTitle from '../common/ProfileTitle';
import ProfileActionBtn from '../common/ProfileActionBtn';
import { motion } from 'framer-motion';
import { scaleVariants } from '../../constants/constants';

function Notifications() {
  const { data } = useFriendRequestsQuery();
  const { friendRequests, setFriendRequests } = useNotificationsStore();

  useEffect(() => {
    if (data) {
      setFriendRequests(data);
    }
  }, [data, setFriendRequests]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={scaleVariants}
      className="ml-2 basis-[25%] w-full"
    >
      {friendRequests.length ? (
        friendRequests.map((request) => {
          return (
            <div
              key={request.id}
              className="flex flex-col p-3 w-full gap-2 bg-secondary/70 rounded-md shadow-md"
            >
              <div className="flex cursor-pointer gap-2">
                <ProfilePicture styles="h-12 w-12 flex-shrink-0" />
                <div className="flex flex-col text-sm whitespace-nowrap max-w-[160px]">
                  <ProfileTitle
                    identifiers={{
                      firstName: 'asoidhasiduagsdsayuig',
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
                />
              </div>
            </div>
          );
        })
      ) : (
        <p className="whitespace-nowrap p-3 text-third font-bold">
          Nothing to show!
        </p>
      )}
    </motion.div>
  );
}

export default Notifications;
