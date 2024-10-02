import { TAuthUser } from 'shared';
import { format } from 'date-fns';

type Props = {
  user: TAuthUser;
};

function ProfileHeader({ user }: Props) {
  const joinedDate = new Date(user.profile.createdAt);

  return (
    <div className="bg-blue-400 rounded-t-md px-6 h-[230px]">
      <div className="h-full flex justify-between">
        <div className="flex items-end">
          <div className="w-36 h-36 rounded-full bg-default-pfp bg-cover bg-center shadow-lg transform translate-y-16" />
          <div className="ml-2 transform translate-y-14">
            <p className="text-2xl font-bold">
              {user.profile.firstName} {user.profile.lastName}
            </p>
            <p>@{user.profile.username}</p>
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
