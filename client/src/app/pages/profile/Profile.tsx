import { useEffect, useState } from 'react';
import ProfileHeader from '../../../components/profile/ProfileHeader';
import { useParams } from 'react-router-dom';
import useProfileStore, { useProfileQuery } from '../../../stores/profileStore';
import IsLoading from '../../../components/IsLoading';
import ShowError from '../../../components/ShowError';
import useAuthStore from '../../../stores/authStore';

type TTabs = 'Posts' | 'Likes' | 'Comments' | 'Friends';
const tabStyle = 'grow hover:bg-gray-300 transition-all py-3';
const tabs: TTabs[] = ['Posts', 'Likes', 'Comments', 'Friends'];

function Profile() {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuthStore();
  const { isMyProfile, setIsMyProfile } = useProfileStore();
  const [activeTab, setActiveTab] = useState<TTabs>('Posts');

  const { data: profile, isLoading, error } = useProfileQuery(username!);

  useEffect(() => {
    if (profile && user) {
      setIsMyProfile(profile.username === user.profile.username);
    }
  }, [user, setIsMyProfile, profile]);

  if (isLoading) {
    return <IsLoading />;
  }

  if (error) {
    return <ShowError message={error.message} />;
  }

  const tabClassName = (tab: TTabs) =>
    `${tabStyle} ${activeTab === tab && 'border-b-4 border-blue-500'}`;

  return (
    <div>
      {profile && <ProfileHeader profile={profile} isMyProfile={isMyProfile} />}
      <div className="pt-20">
        <div className="flex">
          {tabs.map((tab) => {
            return (
              <button
                onClick={() => {
                  setActiveTab(tab);
                }}
                key={tab}
                className={tabClassName(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
