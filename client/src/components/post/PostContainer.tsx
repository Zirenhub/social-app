import { formatDistance } from 'date-fns';
import { TPostApi } from 'shared';
import ProfilePicture from '../profile/ProfilePicture';
import ProfileTitle from '../common/ProfileTitle';
import { useNavigate } from 'react-router-dom';
import PostInteractions from './PostInteractions';

type Props = {
  post: TPostApi;
};

function PostContainer({ post }: Props) {
  const { firstName, lastName, username } = post.profile;
  const navigate = useNavigate();

  const handleNavigatePost = () => {
    navigate(`/${post.profile.username}/${post.id}`);
  };

  return (
    <div
      className="flex flex-col border-secondary/30 border-b-2 px-3 py-2 cursor-pointer hover:bg-secondary/5 transition-all"
      onClick={handleNavigatePost}
    >
      <div className="flex gap-2">
        <ProfilePicture styles="h-12 w-12 flex-shrink-0 border-2 border-secondary/40" />
        <div className="flex flex-col">
          <ProfileTitle identifiers={{ firstName, lastName, username }} />
          {/* Ensure long words break and don't overflow */}
          <p
            className="break-words text-fourth"
            style={{ overflowWrap: 'anywhere' }}
          >
            {post.content}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 gap-2">
        <div className="flex items-center gap-3">
          <PostInteractions post={post} />
        </div>
        <p className="text-xs text-secondary/60">
          {formatDistance(post.createdAt, new Date(), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </p>
      </div>
    </div>
  );
}

export default PostContainer;
