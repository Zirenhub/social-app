import { useQuery } from '@tanstack/react-query';
import { TProfileApi } from 'shared';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getProfileApi } from '../api/profileApi';
import { ApiError } from '../api/error';

type TProfileStore = {
  profile: TProfileApi | null;
  isMyProfile: boolean;
  setProfile: (profile: TProfileApi, currentUsername: string) => void;
};

const useProfileStore = create<TProfileStore>()(
  devtools((set) => ({
    profile: null,
    isMyProfile: false,
    setProfile: (profile: TProfileApi, currentUsername: string) =>
      set({ profile, isMyProfile: profile.username === currentUsername }),
  }))
);

export const useProfileQuery = (username: string) => {
  return useQuery<TProfileApi, ApiError>({
    queryKey: ['profile', username],
    queryFn: () => getProfileApi(username),
    retry: false,
  });
};

export default useProfileStore;
