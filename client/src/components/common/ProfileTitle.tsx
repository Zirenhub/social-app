import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const { pathname } = useLocation();

  const handleNavigateProfile = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const navigateTo = `/${identifiers.username}`;
    if (pathname === navigateTo) {
      document
        .querySelector('[datatype="header"]')
        ?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate(navigateTo);
  };

  return (
    <div
      onClick={(e) => handleNavigateProfile(e)}
      className={twMerge(
        'text-secondary w-full min-w-0 font-bold underline-offset-4 cursor-pointer',
        styles?.names
      )}
    >
      {mode && mode === 'full' ? (
        <div className="flex flex-col leading-none">
          <div className="flex items-center min-w-0">
            <span className="hover:underline truncate">
              {identifiers.firstName} {identifiers.lastName}
            </span>
          </div>
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
        <div className="flex items-center gap-2 min-w-0">
          <div className="truncate hover:underline">
            {identifiers.firstName} {identifiers.lastName}
          </div>
          <span
            className={twMerge(
              'font-medium text-xs text-secondary/50 whitespace-nowrap',
              styles?.username
            )}
          >
            @{identifiers.username}
          </span>
        </div>
      )}
    </div>
  );
}

export default ProfileTitle;
