import { formatDistance } from 'date-fns';
import { TPostApi } from 'shared';
import ProfilePicture from '../profile/ProfilePicture';
import HeartIcon from '../svg/HeartIcon';
import CommentIcon from '../svg/CommentIcon';

type Props = {
  post: TPostApi;
};

function PostContainer({ post }: Props) {
  const interactions = [
    {
      type: 'like',
      svg: (className: string) => <HeartIcon className={className} />,
      value: '12k',
    },
    {
      type: 'comment',
      svg: (className: string) => <CommentIcon className={className} />,
      value: '423',
    },
  ];

  return (
    <div className="flex flex-col border-secondary/30 border-b-2 px-3 py-2">
      <div className="flex gap-2">
        <ProfilePicture styles="h-12 w-12 flex-shrink-0 border-2 border-secondary/40" />
        <div className="flex flex-col">
          <p className="break-words">
            <span className="text-secondary font-bold">
              {post.profile.firstName} {post.profile.lastName}
            </span>{' '}
            <span className="font-medium text-xs text-secondary/50">
              @{post.profile.username}
            </span>
          </p>
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
          {interactions.map((interaction) => (
            <div
              key={interaction.type}
              className="flex select-none p-1 cursor-pointer rounded-md gap-1 text-secondary/60 items-center border-2 border-transparent hover:bg-red-400 hover:text-primary transition-all"
            >
              {interaction.svg('h-6 w-6 fill-current stroke-current')}
              <p>{interaction.value}</p>
            </div>
          ))}
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
