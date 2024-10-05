import { useEffect, useState } from 'react';
import ProfileHeader from '../../../components/profile/ProfileHeader';
import { useParams } from 'react-router-dom';
import useProfileStore, { useProfileQuery } from '../../../stores/profileStore';
import IsLoading from '../../../components/IsLoading';
import ShowError from '../../../components/ShowError';
import useAuthStore from '../../../stores/authStore';

type TTabs = 'Posts' | 'Likes' | 'Comments' | 'Friends';
const profileButtonStyle = 'grow hover:bg-gray-300 transition-all py-3';
const tabs: TTabs[] = ['Posts', 'Likes', 'Comments', 'Friends'];

function Profile() {
  const { profile, setProfile, isMyProfile } = useProfileStore();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TTabs>('Posts');
  const { username } = useParams();

  const { data, isLoading, error } = useProfileQuery(username!);

  useEffect(() => {
    if (data && user) setProfile(data, user.profile.username);
  }, [data, setProfile, user]);

  if (isLoading) {
    <IsLoading />;
  }

  if (error) {
    <ShowError message={error.message} />;
  }

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
                className={`${profileButtonStyle} ${activeTab === tab && 'border-b-4 border-blue-500'}`}
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
