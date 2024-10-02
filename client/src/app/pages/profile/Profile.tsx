import { useState } from 'react';
import ProfileHeader from '../../../components/profile/ProfileHeader';
import useAuthStore from '../../../stores/authStore';

type TTabs = 'Posts' | 'Likes' | 'Comments' | 'Friends';

function Profile() {
  const [activeTab, setActiveTab] = useState<TTabs>('Posts');

  const user = useAuthStore((state) => state.user)!;
  const profileButtonStyle = 'grow hover:bg-gray-300 transition-all py-3';

  const tabs: TTabs[] = ['Posts', 'Likes', 'Comments', 'Friends'];

  return (
    <div>
      <ProfileHeader user={user} />
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
