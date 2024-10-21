import React from 'react';
import { Comment, Like } from 'shared';
import CommentIcon from '../svg/CommentIcon';
import HeartIcon from '../svg/HeartIcon';

type Props = {
  likes: Like[];
  comments: Comment[];
};

function PostInteractions({ likes, comments }: Props) {
  const interactions = [
    {
      type: 'like',
      svg: (className: string) => <HeartIcon className={className} />,
      value: likes.length,
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
      },
    },
    {
      type: 'comment',
      svg: (className: string) => <CommentIcon className={className} />,
      value: comments.length,
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
      {interaction.svg('h-6 w-6 fill-current stroke-current')}
      <p>{interaction.value}</p>
    </button>
  ));
}

export default PostInteractions;
