import React from 'react';
import { TTabs } from '../../app/pages/profile/Profile';

type Props = {
  activeTab: TTabs;
  setActiveTab: React.Dispatch<React.SetStateAction<TTabs>>;
};
const tabs: TTabs[] = ['Posts', 'Likes', 'Comments', 'Friends'];

function ProfileTabs({ activeTab, setActiveTab }: Props) {
  const tabClass = (tab: TTabs) =>
    `grow py-3 text-secondary font-bold transition-all border-b-2  ${tab === activeTab ? 'border-b-2 border-blue-400' : ''}`;

  return (
    <div className="flex">
      {tabs.map((tab) => {
        return (
          <button
            onClick={() => setActiveTab(tab)}
            key={tab}
            className={tabClass(tab)}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export default ProfileTabs;
