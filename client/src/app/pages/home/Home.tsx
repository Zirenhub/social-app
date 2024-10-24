import IsLoading from '../../../components/IsLoading';
import ShowError from '../../../components/ShowError';
import { useGetAllPostsQuery } from '../../../stores/postsStore';
import PostContainer from '../../../components/post/PostContainer';
import CreatePost from '../../../components/post/CreatePost';

function Home() {
  const { data, isLoading, error } = useGetAllPostsQuery();

  if (isLoading) {
    return <IsLoading />;
  }

  if (error) {
    return <ShowError message={error.message} />;
  }

  if (data?.length) {
    return (
      <div className="flex flex-col">
        <div className=" text-secondary rounded-br-lg p-3">
          <CreatePost />
        </div>
        <div className="h-1 bg-third/20 mt-2" />
        {data.map((post) => (
          <PostContainer key={post.id} post={post} />
        ))}
      </div>
    );
  }

  return <div>No posts to show</div>;
}

export default Home;
