import { TProfileApi } from 'shared';
import { format } from 'date-fns';
import ProfilePicture from './ProfilePicture';
import {
  useAcceptFriendshipRequestMutation,
  useDeleteFriendshipRequestMutation,
  useFriendshipRequestMutation,
} from '../../stores/profileStore';
import { toast } from 'react-toastify';
import ProfileActionBtn from '../common/ProfileActionBtn';

type Props = {
  profile: TProfileApi;
  isMyProfile: boolean;
};

function ProfileHeader({ profile, isMyProfile }: Props) {
  const { mutate: request, isPending: requestIsPending } =
    useFriendshipRequestMutation({
      username: profile.username,
      callbacks: {
        onSuccess: () => toast.success('Friend request sent!'),
        onError: (errorMsg: string) => toast.error(errorMsg),
      },
    });

  const { mutate: deleteRequest, isPending: cancelIsPending } =
    useDeleteFriendshipRequestMutation({
      username: profile.username,
      callbacks: {
        onSuccess: () => toast.success('Friend deleted!'),
        onError: (errorMsg: string) => toast.error(errorMsg),
      },
    });

  const { mutate: acceptRequest, isPending: acceptIsPending } =
    useAcceptFriendshipRequestMutation({
      username: profile.username,
      callbacks: {
        onSuccess: () => toast.success('Friend request accepted!'),
        onError: (errorMsg: string) => toast.error(errorMsg),
      },
    });

  const renderActionButton = () => {
    console.log(profile);
    const { status } = profile.friendshipStatus;
    if (isMyProfile) {
      return (
        <ProfileActionBtn
          label="Edit Profile"
          className="bg-secondary hover:bg-red-400"
        />
      );
    }
    if (requestIsPending) {
      return (
        <ProfileActionBtn
          label="Request is pending..."
          className="bg-green-400 hover:bg-blue-500"
          disabled={true}
        />
      );
    }
    if (cancelIsPending) {
      return (
        <ProfileActionBtn
          label="Canceling..."
          className="bg-red-400 hover:bg-red-500"
          disabled={true}
        />
      );
    }
    if (acceptIsPending) {
      return (
        <ProfileActionBtn
          label="Accepting request..."
          className="bg-blue-400 hover:bg-blue-500"
          disabled={true}
        />
      );
    }

    if (status === 'REQUEST_SENT') {
      return (
        <ProfileActionBtn
          label="Delete Request"
          className="bg-red-400 hover:bg-red-500"
          onClick={deleteRequest}
        />
      );
    }
    if (status === 'RECEIVED_REQUEST') {
      return (
        <ProfileActionBtn
          label="Accept Request"
          className="bg-green-400 hover:bg-blue-400"
          onClick={acceptRequest}
        />
      );
    }
    if (status === 'FRIENDS') {
      return (
        <ProfileActionBtn
          label="Friends"
          className="bg-blue-400 hover:bg-red-400 hover"
          onHoverLabel="Remove friendship"
        />
      );
    }
    return (
      <ProfileActionBtn
        label="Add Friend"
        className="bg-blue-400 hover:bg-red-400"
        onClick={request}
      />
    );
  };

  const joinedDate = new Date(profile.createdAt);

  return (
    <div className="bg-green-400 rounded-t-md px-6 h-[230px]">
      <div className="h-full flex justify-between">
        <div className="flex items-end">
          <ProfilePicture styles="w-36 h-36  shadow-lg transform translate-y-16" />
          <div className="ml-2 transform translate-y-14">
            <p className="text-2xl font-bold text-fourth">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-secondary/70">@{profile.username}</p>
          </div>
        </div>
        <div className="transform translate-y-12 flex flex-col items-end justify-end">
          {renderActionButton()}
          <p className="text-xs text-secondary/70">
            Joined {format(joinedDate, 'MMMM yyyy')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
