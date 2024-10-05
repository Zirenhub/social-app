import { TProfileApi } from 'shared';
import { format } from 'date-fns';
import ProfilePicture from './ProfilePicture';

type Props = {
  profile: TProfileApi;
  isMyProfile: boolean;
};

function ProfileHeader({ profile, isMyProfile }: Props) {
  const joinedDate = new Date(profile.createdAt);

  return (
    <div className="bg-green-400 rounded-t-md px-6 h-[230px]">
      <div className="h-full flex justify-between">
        <div className="flex items-end">
          <ProfilePicture styles="w-36 h-36  shadow-lg transform translate-y-16" />
          <div className="ml-2 transform translate-y-14">
            <p className="text-2xl font-bold text-fourth">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-secondary/70">@{profile.username}</p>
          </div>
        </div>
        <div className="transform translate-y-12 flex flex-col items-end justify-end">
          {isMyProfile ? (
            <button className="text-sm bg-secondary text-primary rounded-lg py-1 px-3 hover:bg-red-400 transition-all hover:text-secondary">
              Edit Profile
            </button>
          ) : (
            <button className="text-sm bg-blue-400 text-primary rounded-lg py-1 px-3 hover:bg-red-400 transition-all hover:text-secondary">
              Add friend
            </button>
          )}
          <p className="text-xs text-secondary/70">
            Joined {format(joinedDate, 'MMMM yyyy')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
