import { create } from 'zustand';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Profile, TAuthUserApi } from 'shared';
import { logInApi, logoutApi, signupApi, whoAmiApi } from '../api/userApi';
import { ApiError } from '../api/error';
import { devtools } from 'zustand/middleware';

type TAuthStore = {
  user: TAuthUserApi | null;
  isAuthenticated: boolean;
  setUser: (user: TAuthUserApi) => void;
  setProfile: (profile: Profile) => void;
  logout: () => void;
};

const useAuthStore = create<TAuthStore>()(
  devtools((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user: TAuthUserApi) => set({ user, isAuthenticated: true }),
    setProfile: (profile: Profile) =>
      set((state) => {
        if (state.user) {
          return {
            user: { ...state.user, profile },
          };
        }
        return state;
      }),
    logout: () => set({ user: null, isAuthenticated: false }),
  }))
);

// React Query hooks

export const useWhoAmI = () => {
  return useQuery({
    queryKey: ['whoami'],
    queryFn: whoAmiApi,
    retry: false, // Default is retry for 3 times if getting error from server
    refetchOnWindowFocus: false,
  });
};

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: logInApi,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (err: ApiError) => {
      console.log(err);
    },
  });
};

export const useSignUp = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (err: ApiError) => {
      console.log(err);
    },
  });
};

export const useLogout = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout();
      queryClient.clear();
      onSuccess();
    },
    onError: (err: ApiError) => {
      console.log(err);
    },
  });
};

export default useAuthStore;
