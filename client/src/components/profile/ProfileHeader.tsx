import { TProfileApi } from 'shared';
import { format } from 'date-fns';
import ProfilePicture from './ProfilePicture';

type Props = {
  profile: TProfileApi;
};

function ProfileHeader({ profile }: Props) {
  const joinedDate = new Date(profile.createdAt);

  return (
    <div className="bg-blue-400 rounded-t-md px-6 h-[230px]">
      <div className="h-full flex justify-between">
        <div className="flex items-end">
          <ProfilePicture styles="w-36 h-36  shadow-lg transform translate-y-16" />
          <div className="ml-2 transform translate-y-14">
            <p className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </p>
            <p>@{profile.username}</p>
          </div>
        </div>
        <div className="mt-auto transform translate-y-8">
          <p className="text-sm">Joined {format(joinedDate, 'MMMM yyyy')}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
