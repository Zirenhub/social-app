import React from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type Props = {
  identifiers: {
    firstName: string;
    lastName: string;
    username: string;
  };
  styles?: {
    names?: string;
    username?: string;
  };
  mode?: 'compact' | 'full';
};

function ProfileTitle({ identifiers, styles, mode }: Props) {
  const navigate = useNavigate();

  const handleNavigateProfile = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate(`/${identifiers.username}`);
  };

  return (
    <div
      onClick={(e) => handleNavigateProfile(e)}
      className={twMerge(
        'text-secondary flex gap-2 items-center font-bold underline-offset-4 cursor-pointer',
        styles?.names
      )}
    >
      {mode && mode === 'full' ? (
        <div className="truncate flex flex-col leading-none">
          <span className="hover:underline">
            {identifiers.firstName} {identifiers.lastName}
          </span>
          <span
            className={twMerge(
              'font-medium text-xs text-secondary/50',
              styles?.username
            )}
          >
            @{identifiers.username}
          </span>
        </div>
      ) : (
        <>
          <div className="truncate">
            <span className="hover:underline">
              {identifiers.firstName} {identifiers.lastName}
            </span>
          </div>
          <div>
            <span
              className={twMerge(
                'font-medium text-xs text-secondary/50',
                styles?.username
              )}
            >
              @{identifiers.username}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileTitle;
