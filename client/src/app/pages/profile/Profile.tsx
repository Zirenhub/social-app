import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../../../components/profile/ProfileHeader';
import useProfileStore, {
  useProfilePostsQuery,
  useProfileQuery,
} from '../../../stores/profileStore';
import IsLoading from '../../../components/IsLoading';
import ShowError from '../../../components/ShowError';
import useAuthStore from '../../../stores/authStore';
import PostContainer from '../../../components/post/PostContainer';
import ProfileTabs from '../../../components/profile/ProfileTabs';

export type TTabs = 'Posts' | 'Likes' | 'Comments' | 'Friends';

function Profile() {
  const [activeTab, setActiveTab] = useState<TTabs>('Posts');
  const { username } = useParams<{ username: string }>();
  const { user } = useAuthStore();
  const { isMyProfile, setIsMyProfile } = useProfileStore();

  const {
    data: profile,
    isLoading: profileIsLoading,
    error: profileIsError,
  } = useProfileQuery(username!);

  const {
    data: posts,
    isLoading: postsIsLoading,
    error: postsIsError,
  } = useProfilePostsQuery(username!);

  useEffect(() => {
    if (profile && user) {
      setIsMyProfile(profile.username === user.profile.username);
    }
  }, [user, setIsMyProfile, profile]);

  if (profileIsLoading) {
    return <IsLoading />;
  }

  if (profileIsError) {
    return <ShowError message={profileIsError.message} />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Posts':
        if (postsIsLoading) return <IsLoading />;
        if (postsIsError) return <ShowError message={postsIsError.message} />;
        if (posts?.length) {
          return posts.map((post) => (
            <PostContainer key={post.id} post={post} />
          ));
        }
        return (
          <p className="text-center text-bold text-secondary text-xl mt-4">
            No posts to show!
          </p>
        );
      case 'Likes':
        return <p>Likes content here</p>;
      case 'Comments':
        return <p>Comments content here</p>;
      case 'Friends':
        return <p>Friends content here</p>;
      default:
        return null;
    }
  };

  return (
    <div>
      {profile && <ProfileHeader profile={profile} isMyProfile={isMyProfile} />}
      <div className="pt-20">
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Profile;
