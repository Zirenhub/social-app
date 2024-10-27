import { format } from 'date-fns';
import {
  handleUpdateFriendships,
  useProfileFriendshipsQuery,
} from '../../stores/profileStore';
import ProfileTitle from '../common/ProfileTitle';
import IsLoading from '../IsLoading';
import ShowError from '../ShowError';
import ProfilePicture from './ProfilePicture';
import useAuthStore from '../../stores/authStore';
import useProfileAction from '../../hooks/useProfileAction';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  username: string;
};

function ProfileFriends({ username }: Props) {
  const { user } = useAuthStore();
  const {
    data: friendships,
    isLoading: friendshipsIsLoading,
    error: friendshipsIsError,
  } = useProfileFriendshipsQuery(username);
  const queryClient = useQueryClient();

  const { renderActionButton } = useProfileAction({
    acceptMutation: (data) =>
      handleUpdateFriendships(data, username, queryClient),
    rejectMutation: (data) =>
      handleUpdateFriendships(data, username, queryClient),
    deleteMutation: (data) =>
      handleUpdateFriendships(data, username, queryClient),
    requestMutation: (data) =>
      handleUpdateFriendships(data, username, queryClient),
  });

  if (friendshipsIsLoading) {
    return <IsLoading />;
  }

  if (friendshipsIsError) {
    return <ShowError message={friendshipsIsError.message} />;
  }

  if (friendships?.length) {
    return (
      <div className="p-6 bg-primary/10 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friendships.map((friend) => (
            <div
              key={friend.id}
              className="group flex items-start gap-4 p-4 rounded-lg bg-white hover:bg-primary/20 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div className="relative">
                <ProfilePicture styles="h-16 w-16 rounded-full border-2 border-third/20 group-hover:border-third/40 transition-colors duration-300" />
              </div>

              <div className="flex flex-col flex-grow min-w-0">
                <div className="mb-1">
                  <ProfileTitle
                    identifiers={{
                      firstName: friend.firstName,
                      lastName: friend.lastName,
                      username: friend.username,
                    }}
                  />
                </div>

                <p className="text-secondary/70 text-sm mb-3">
                  Friends since{' '}
                  {format(new Date(friend.createdAt), 'MMMM yyyy')}
                </p>

                <div className="mt-auto">
                  {renderActionButton({
                    profile: friend,
                    isMyProfile: user?.profile.username === friend.username,
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-primary/10 rounded-xl">
      <div className="text-third text-xl font-bold mb-2">No Friends Yet</div>
      <p className="text-secondary/70 text-center">
        When you connect with others, they&apos;ll appear here.
      </p>
    </div>
  );
}

export default ProfileFriends;
