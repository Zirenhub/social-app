import { useQuery } from '@tanstack/react-query';
import { TProfile } from 'shared';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getProfileApi } from '../api/profileApi';

type TProfileStore = {
  profile: TProfile | null;
  setProfile: (profile: TProfile) => void;
};

const useProfileStore = create<TProfileStore>()(
  devtools((set) => ({
    profile: null,
    setProfile: (profile: TProfile) => set({ profile }),
  }))
);

export const useProfileQuery = (username: string) => {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: () => getProfileApi(username),
  });
};

export default useProfileStore;
