import { useEffect } from 'react';
import IsLoading from '../../../components/IsLoading';
import ShowError from '../../../components/ShowError';
import usePostsStore, { useGetAllPostsQuery } from '../../../stores/postsStore';
import PostContainer from '../../../components/post/PostContainer';

function Home() {
  const { posts, initPosts } = usePostsStore();
  const { data, isLoading, error } = useGetAllPostsQuery();

  useEffect(() => {
    if (data) initPosts(data);
  }, [data, initPosts]);

  if (isLoading) {
    <IsLoading />;
  }

  if (error) {
    <ShowError message={error.message} />;
  }

  return posts.map((post) => <PostContainer key={post.id} post={post} />);
}

export default Home;
