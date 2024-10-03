import { useState } from 'react';
import ProfileHeader from '../../../components/profile/ProfileHeader';
import { useParams } from 'react-router-dom';
import { useProfileQuery } from '../../../stores/profileStore';

type TTabs = 'Posts' | 'Likes' | 'Comments' | 'Friends';
const profileButtonStyle = 'grow hover:bg-gray-300 transition-all py-3';
const tabs: TTabs[] = ['Posts', 'Likes', 'Comments', 'Friends'];

function Profile() {
  const [activeTab, setActiveTab] = useState<TTabs>('Posts');
  const { username } = useParams();

  const { data: profile, isLoading, error } = useProfileQuery(username!);

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error fetching profile ${error.message}</div>;
  }

  return (
    <div>
      <ProfileHeader profile={profile!} />
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
