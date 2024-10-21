import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '../../../stores/postsStore';
import IsLoading from '../../../components/IsLoading';
import ShowError from '../../../components/ShowError';
import ProfilePicture from '../../../components/profile/ProfilePicture';
import ProfileTitle from '../../../components/common/ProfileTitle';
import BackIcon from '../../../components/svg/BackIcon';
import EllipsisIcon from '../../../components/svg/EllipsisIcon';
import { format } from 'date-fns';
import PostInteractions from '../../../components/post/PostInteractions';

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
    return (
      <>
        <div className="flex items-center border-b-2 border-third/20 p-3 gap-6">
          <button className="text-secondary hover:bg-third hover:text-primary transition-all rounded-full">
            <BackIcon className="h-8 w-8 fill-current stroke-current" />
          </button>
          <p className="text-third font-bold text-xl">Post</p>
        </div>
        <div className="flex flex-col px-3 pt-3 pb-1 border-b-2 border-third/20">
          <div className="flex gap-3 items-center">
            <ProfilePicture styles="h-14 w-14 border-2" />
            <div className="flex flex-col">
              <ProfileTitle
                identifiers={{
                  firstName: post.profile.firstName,
                  lastName: post.profile.lastName,
                  username: post.profile.username,
                }}
                styles={{ names: 'text-lg', username: 'text-sm' }}
                mode="full"
              />
            </div>
            <div className="ml-auto">
              <EllipsisIcon className="h-4 w-4 ml-8 fill-current stroke-current" />
            </div>
          </div>
          <div className="px-2 py-2">
            <p>{post.content}</p>
          </div>
          <p className="px-2 text-secondary/60">
            {format(new Date(post.createdAt), "h:mm a '·' MMM d, yyyy")}
          </p>
        </div>
        <p className="flex items-center gap-3 px-4 pt-1">
          <PostInteractions comments={post.comments} likes={post.likes} />
        </p>
      </>
    );
  }

  return <div>tt</div>;
}

export default Post;
