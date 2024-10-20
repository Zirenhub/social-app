import { useProfilePostsQuery } from '../../stores/profileStore';
import IsLoading from '../IsLoading';
import PostContainer from '../post/PostContainer';
import ShowError from '../ShowError';

type Props = {
  username: string;
};

function ProfilePosts({ username }: Props) {
  const {
    data: posts,
    isLoading: postsIsLoading,
    error: postsIsError,
  } = useProfilePostsQuery(username);

  if (postsIsLoading) return <IsLoading />;
  if (postsIsError) return <ShowError message={postsIsError.message} />;
  if (posts?.length) {
    return posts.map((post) => <PostContainer key={post.id} post={post} />);
  }
  return (
    <p className="text-center text-bold text-secondary text-xl mt-4">
      No posts to show!
    </p>
  );
}

export default ProfilePosts;
