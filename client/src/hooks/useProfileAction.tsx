import { toast } from 'react-toastify';
import { TProfileApi } from 'shared';
import {
  useAcceptFriendshipRequestMutation,
  useDeleteFriendshipMutation,
  useDeleteFriendshipRequestMutation,
  useFriendshipRequestMutation,
} from '../stores/profileStore';
import ProfileActionBtn from '../components/common/ProfileActionBtn';

type renderProps = {
  profile: TProfileApi;
  isMyProfile: boolean;
  className?: string;
};

type onSuccessCallback = (data: TProfileApi) => void;

type Props = {
  requestMutation?: onSuccessCallback;
  rejectMutation?: onSuccessCallback;
  acceptMutation?: onSuccessCallback;
  deleteMutation?: onSuccessCallback;
};

function useProfileAction({
  requestMutation,
  rejectMutation,
  acceptMutation,
  deleteMutation,
}: Props) {
  const makeCallbacks = (
    onSuccessMsg: string,
    callback?: onSuccessCallback
  ) => ({
    onSuccess: (data: TProfileApi) => {
      toast.success(onSuccessMsg);
      if (callback) callback(data);
    },
    onError: (errorMsg: string) => toast.error(errorMsg),
  });

  const request = useFriendshipRequestMutation(
    makeCallbacks('Friend request sent!', requestMutation)
  );

  const reject = useDeleteFriendshipRequestMutation(
    makeCallbacks('Friend request deleted!', rejectMutation)
  );

  const accept = useAcceptFriendshipRequestMutation(
    makeCallbacks('Friend request accepted!', acceptMutation)
  );

  const _delete = useDeleteFriendshipMutation(
    makeCallbacks('Friendship deleted!', deleteMutation)
  );

  const styles = {
    editProfile: 'bg-secondary hover:bg-red-400',
    acceptRequest: 'bg-green-400 hover:bg-blue-500',
    rejectRequest: 'bg-red-400 hover:bg-red-500',
    sendRequest: 'bg-blue-400 hover:bg-red-400',
  };

  const renderActionButton = ({ profile, isMyProfile }: renderProps) => {
    const { status } = profile.friendshipStatus;
    if (isMyProfile)
      return (
        <ProfileActionBtn label="Edit Profile" className={styles.editProfile} />
      );
    if (request.isPending)
      return (
        <ProfileActionBtn
          label="Request is pending..."
          className={styles.acceptRequest}
          disabled
        />
      );
    if (reject.isPending)
      return (
        <ProfileActionBtn
          label="Canceling..."
          className={styles.rejectRequest}
          disabled
        />
      );
    if (accept.isPending)
      return (
        <ProfileActionBtn
          label="Accepting request..."
          className={styles.acceptRequest}
          disabled
        />
      );
    // deleteMutation is pending
    switch (status) {
      case 'REQUEST_SENT':
        return (
          <ProfileActionBtn
            label="Delete Request"
            className={styles.rejectRequest}
            onClick={() => reject.mutate(profile.username)}
          />
        );
      case 'RECEIVED_REQUEST':
        return (
          <ProfileActionBtn
            label="Accept Request"
            className={styles.acceptRequest}
            onClick={() => accept.mutate(profile.username)}
          />
        );
      case 'FRIENDS':
        return (
          <ProfileActionBtn
            label="Friends"
            className={styles.sendRequest}
            onHoverLabel="Remove friendship"
            onClick={() => _delete.mutate(profile.username)}
          />
        );
      default:
        return (
          <ProfileActionBtn
            label="Add Friend"
            className={styles.sendRequest}
            onClick={() => request.mutate(profile.username)}
          />
        );
    }
  };

  return { renderActionButton };
}

export default useProfileAction;
