import { format } from 'date-fns';
import { useProfileFriendshipsQuery } from '../../stores/profileStore';
import ProfileTitle from '../common/ProfileTitle';
import IsLoading from '../IsLoading';
import ShowError from '../ShowError';
import ProfilePicture from './ProfilePicture';

type Props = {
  username: string;
};

function ProfileFriends({ username }: Props) {
  const {
    data: friendships,
    isLoading: friendshipsIsLoading,
    error: friendshipsIsError,
  } = useProfileFriendshipsQuery(username);

  if (friendshipsIsLoading) {
    return <IsLoading />;
  }
  if (friendshipsIsError) {
    return <ShowError message={friendshipsIsError.message} />;
  }
  if (friendships?.length) {
    return (
      <div className="grid grid-cols-3 grid-rows-4 gap-3 p-3 cursor-pointer">
        {friendships.map((friend) => {
          return (
            <div
              key={friend.id}
              className="flex gap-3 p-3 rounded-lg shadow-md bg-white"
            >
              <ProfilePicture styles="h-12 w-12 border-2" />
              <div className="flex flex-col justify-between">
                <ProfileTitle
                  identifiers={{
                    firstName: friend.profile.firstName,
                    lastName: friend.profile.lastName,
                    username: friend.profile.username,
                  }}
                />
                <p className="text-secondary/50 font-bold text-sm">
                  Friends since{' '}
                  {format(new Date(friend.profile.createdAt), 'MMMM yyyy')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <p className="text-center text-bold text-secondary text-xl mt-4">
      No friendships to show!
    </p>
  );
}

export default ProfileFriends;
