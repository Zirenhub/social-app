import { useProfileLikesQuery } from '../../stores/profileStore';
import IsLoading from '../IsLoading';
import PostContainer from '../post/PostContainer';
import ShowError from '../ShowError';

type Props = {
  username: string;
};

function ProfileLikes({ username }: Props) {
  const { data: likes, isLoading, error } = useProfileLikesQuery(username);

  if (isLoading) {
    return <IsLoading />;
  }

  if (error) {
    return <ShowError message={error.message} />;
  }

  if (likes?.length) {
    return (
      <div>
        {likes.map((like) => {
          return <PostContainer post={like} key={like.id} />;
        })}
      </div>
    );
  }
  return (
    <p className="text-center text-bold text-secondary text-xl mt-4">
      No likes to show!
    </p>
  );
}

export default ProfileLikes;
