import { toast } from 'react-toastify';
import { TProfileApi } from 'shared';
import {
  useAcceptFriendshipRequestMutation,
  useDeleteFriendshipMutation,
  useDeleteFriendshipRequestMutation,
  useFriendshipRequestMutation,
} from '../stores/profileStore';
import ProfileActionBtn from '../components/common/ProfileActionBtn';

type Props = {
  profile: TProfileApi;
  isMyProfile: boolean;
};

function useProfileAction({ profile, isMyProfile }: Props) {
  const makeCallbacks = (onSuccessMsg: string) => {
    return {
      onSuccess: () => toast.success(onSuccessMsg),
      onError: (errorMsg: string) => toast.error(errorMsg),
    };
  };

  const requestMutation = useFriendshipRequestMutation(
    makeCallbacks('Friend request sent!')
  );

  const rejectMutation = useDeleteFriendshipRequestMutation(
    makeCallbacks('Friend request deleted!')
  );

  const acceptMutation = useAcceptFriendshipRequestMutation(
    makeCallbacks('Friend request accepted!')
  );

  const deleteMutation = useDeleteFriendshipMutation(
    makeCallbacks('Friendship deleted!')
  );

  const renderActionButton = () => {
    const { status } = profile.friendshipStatus;
    if (isMyProfile)
      return (
        <ProfileActionBtn
          label="Edit Profile"
          className="bg-secondary hover:bg-red-400"
        />
      );
    if (requestMutation.isPending)
      return (
        <ProfileActionBtn
          label="Request is pending..."
          className="bg-green-400 hover:bg-blue-500"
          disabled
        />
      );
    if (rejectMutation.isPending)
      return (
        <ProfileActionBtn
          label="Canceling..."
          className="bg-red-400 hover:bg-red-500"
          disabled
        />
      );
    if (acceptMutation.isPending)
      return (
        <ProfileActionBtn
          label="Accepting request..."
          className="bg-blue-400 hover:bg-blue-500"
          disabled
        />
      );
    // deleteMutation is pending
    switch (status) {
      case 'REQUEST_SENT':
        return (
          <ProfileActionBtn
            label="Delete Request"
            className="bg-red-400 hover:bg-red-500"
            onClick={() => rejectMutation.mutate(profile.username)}
          />
        );
      case 'RECEIVED_REQUEST':
        return (
          <ProfileActionBtn
            label="Accept Request"
            className="bg-green-400 hover:bg-blue-400"
            onClick={() => acceptMutation.mutate(profile.username)}
          />
        );
      case 'FRIENDS':
        return (
          <ProfileActionBtn
            label="Friends"
            className="bg-blue-400 hover:bg-red-400 hover"
            onHoverLabel="Remove friendship"
            onClick={() => deleteMutation.mutate(profile.username)}
          />
        );
      default:
        return (
          <ProfileActionBtn
            label="Add Friend"
            className="bg-blue-400 hover:bg-red-400"
            onClick={() => requestMutation.mutate(profile.username)}
          />
        );
    }
  };

  return { renderActionButton };
}

export default useProfileAction;
