import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../../../components/profile/ProfileHeader';
import useProfileStore, { useProfileQuery } from '../../../stores/profileStore';
import IsLoading from '../../../components/IsLoading';
import ShowError from '../../../components/ShowError';
import useAuthStore from '../../../stores/authStore';
import ProfileTabs from '../../../components/profile/ProfileTabs';
import ProfilePosts from '../../../components/profile/ProfilePosts';
import ProfileFriends from '../../../components/profile/ProfileFriends';
import ProfileLikes from '../../../components/profile/ProfileLikes';

export type TTabs = 'Posts' | 'Likes' | 'Comments' | 'Friends';

function Profile() {
  const [activeTab, setActiveTab] = useState<TTabs>('Posts');
  const { username } = useParams<{ username: string }>();
  const { user } = useAuthStore();
  const { isMyProfile, setProfile } = useProfileStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    data: profile,
    isLoading: profileIsLoading,
    error: profileIsError,
  } = useProfileQuery(username!);

  useEffect(() => {
    if (profile && user) {
      setProfile(profile, user);
    }
  }, [user, setProfile, profile]);

  if (profileIsLoading) {
    return <IsLoading />;
  }

  if (profileIsError) {
    return <ShowError message={profileIsError.message} />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Posts':
        return <ProfilePosts username={username as string} />;
      case 'Likes':
        return <ProfileLikes username={username as string} />;
      case 'Comments':
        return <p>Comments content here</p>;
      case 'Friends':
        return <ProfileFriends username={username as string} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ overflowY: 'scroll', height: '100%' }} ref={scrollRef}>
      {profile && (
        <ProfileHeader
          scrollRef={scrollRef}
          profile={profile}
          isMyProfile={isMyProfile}
        />
      )}
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTabContent()}
    </div>
  );
}

export default Profile;
