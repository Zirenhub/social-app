import { toast } from 'react-toastify';
import { TProfileApi } from 'shared';
import {
  useAcceptFriendshipRequestMutation,
  useDeleteFriendshipRequestMutation,
  useFriendshipRequestMutation,
} from '../stores/profileStore';
import ProfileActionBtn from '../components/common/ProfileActionBtn';

type Props = {
  profile: TProfileApi;
  isMyProfile: boolean;
};

function useProfileAction({ profile, isMyProfile }: Props) {
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
    const { status } = profile.friendshipStatus;
    if (isMyProfile)
      return (
        <ProfileActionBtn
          label="Edit Profile"
          className="bg-secondary hover:bg-red-400"
        />
      );
    if (requestIsPending)
      return (
        <ProfileActionBtn
          label="Request is pending..."
          className="bg-green-400 hover:bg-blue-500"
          disabled
        />
      );
    if (cancelIsPending)
      return (
        <ProfileActionBtn
          label="Canceling..."
          className="bg-red-400 hover:bg-red-500"
          disabled
        />
      );
    if (acceptIsPending)
      return (
        <ProfileActionBtn
          label="Accepting request..."
          className="bg-blue-400 hover:bg-blue-500"
          disabled
        />
      );

    switch (status) {
      case 'REQUEST_SENT':
        return (
          <ProfileActionBtn
            label="Delete Request"
            className="bg-red-400 hover:bg-red-500"
            onClick={deleteRequest}
          />
        );
      case 'RECEIVED_REQUEST':
        return (
          <ProfileActionBtn
            label="Accept Request"
            className="bg-green-400 hover:bg-blue-400"
            onClick={acceptRequest}
          />
        );
      case 'FRIENDS':
        return (
          <ProfileActionBtn
            label="Friends"
            className="bg-blue-400 hover:bg-red-400 hover"
            onHoverLabel="Remove friendship"
          />
        );
      default:
        return (
          <ProfileActionBtn
            label="Add Friend"
            className="bg-blue-400 hover:bg-red-400"
            onClick={request}
          />
        );
    }
  };

  return { renderActionButton };
}

export default useProfileAction;
