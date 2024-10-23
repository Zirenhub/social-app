import React from 'react';
import { TPostApi } from 'shared';
import CommentIcon from '../svg/CommentIcon';
import HeartIcon from '../svg/HeartIcon';
import { usePostLike } from '../../stores/postsStore';

type Props = {
  post: TPostApi;
};

function PostInteractions({ post }: Props) {
  const { mutate: likePost } = usePostLike();

  const interactions = [
    {
      type: 'like',
      svg: (className: string) => (
        <HeartIcon
          className={`${className} ${post.hasLiked && 'fill-red-500 stroke-red-500'}`}
        />
      ),
      value: post.likes.length,
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        likePost(post.id);
      },
    },
    {
      type: 'comment',
      svg: (className: string) => <CommentIcon className={className} />,
      value: post.comments.length,
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        e.stopPropagation(),
    },
  ];

  return interactions.map((interaction) => (
    <button
      key={interaction.type}
      className="flex select-none p-1 cursor-pointer rounded-md gap-1 text-secondary/60 items-center border-2 border-transparent hover:bg-red-400 hover:text-primary transition-all"
      onClick={(e) => interaction.onClick(e)}
    >
      {interaction.svg(`h-6 w-6 fill-current stroke-current`)}
      <p>{interaction.value}</p>
    </button>
  ));
}

export default PostInteractions;
