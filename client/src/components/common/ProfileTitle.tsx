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
};

function ProfileTitle({ identifiers, styles }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${identifiers.username}`)}
      className={twMerge(
        'text-secondary flex gap-2 items-center font-bold hover:underline underline-offset-4',
        styles?.names
      )}
    >
      <div className="truncate">
        <span>
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
    </div>
  );
}

export default ProfileTitle;
