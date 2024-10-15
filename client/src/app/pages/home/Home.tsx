import IsLoading from '../../../components/IsLoading';
import ShowError from '../../../components/ShowError';
import { useGetAllPostsQuery } from '../../../stores/postsStore';
import PostContainer from '../../../components/post/PostContainer';

function Home() {
  const { data, isLoading, error } = useGetAllPostsQuery();

  if (isLoading) {
    <IsLoading />;
  }

  if (error) {
    <ShowError message={error.message} />;
  }

  if (data && data.length) {
    return data.map((post) => <PostContainer key={post.id} post={post} />);
  }

  return <div>No posts to show</div>;
}

export default Home;
