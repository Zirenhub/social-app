import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '../../../stores/postsStore';
import IsLoading from '../../../components/IsLoading';
import ShowError from '../../../components/ShowError';

function Post() {
  const { postId, username } = useParams<{
    postId: string;
    username: string;
  }>();

  const {
    data: post,
    isLoading: postIsLoading,
    error,
  } = useGetPostQuery(username!, postId!);

  if (postIsLoading) {
    return <IsLoading />;
  }

  if (error) {
    return <ShowError message={error.message} />;
  }

  if (post) {
    return <div>{post.content}</div>;
  }

  return <div>tt</div>;
}

export default Post;
