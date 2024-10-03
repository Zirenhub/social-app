import { useQuery } from '@tanstack/react-query';
import { TProfileApi } from 'shared';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getProfileApi } from '../api/profileApi';
import { ApiError } from '../api/error';

type TProfileStore = {
  profile: TProfileApi | null;
  setProfile: (profile: TProfileApi) => void;
};

const useProfileStore = create<TProfileStore>()(
  devtools((set) => ({
    profile: null,
    setProfile: (profile: TProfileApi) => set({ profile }),
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
