import { format } from 'date-fns';
import { TPostApi } from 'shared';
import ProfilePicture from '../profile/ProfilePicture';

type Props = {
  post: TPostApi;
};

function PostContainer({ post }: Props) {
  return (
    <div className="flex flex-col border-2 my-3 px-3 py-2 mx-2">
      <div className="flex items-center">
        <ProfilePicture styles="h-12 w-12" />
        <div className="flex flex-col">
          <p>
            {post.profile.firstName} {post.profile.lastName}{' '}
            <span>@{post.profile.username}</span>
          </p>
        </div>
      </div>

      <p>{post.content}</p>
      <p>{format(post.createdAt, 'eeee MMM yy HH:mm')}</p>
    </div>
  );
}

export default PostContainer;
