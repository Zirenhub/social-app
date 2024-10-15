import { format } from 'date-fns';
import { TProfileApi } from 'shared';
import ProfilePicture from './ProfilePicture';
import useProfileAction from '../../hooks/useProfileAction';

type Props = {
  profile: TProfileApi;
  isMyProfile: boolean;
};

const ProfileHeader = ({ profile, isMyProfile }: Props) => {
  const { renderActionButton } = useProfileAction({ profile, isMyProfile });

  return (
    <div className="bg-green-400 rounded-t-md px-6 h-[230px] flex justify-between items-end">
      <div className="flex items-end">
        <ProfilePicture styles="w-36 h-36 shadow-lg transform translate-y-16" />
        <div className="ml-2 transform translate-y-14">
          <p className="text-2xl font-bold text-fourth">
            {`${profile.firstName} ${profile.lastName}`}
          </p>
          <p className="text-secondary/70">@{profile.username}</p>
        </div>
      </div>
      <div className="transform translate-y-12 flex flex-col items-end justify-end">
        {renderActionButton()}
        <p className="text-xs text-secondary/70">
          Joined {format(new Date(profile.createdAt), 'MMMM yyyy')}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
