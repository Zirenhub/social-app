import { create } from 'zustand';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TAuthUser } from 'shared';
import { logInApi, logoutApi, signupApi } from '../api/userApi';
import { ApiError } from '../api/error';
import { devtools } from 'zustand/middleware';

type TAuthStore = {
  user: TAuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: TAuthUser) => void;
  logout: () => void;
};

const useAuthStore = create<TAuthStore>()(
  devtools((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user: TAuthUser) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
  }))
);

// React Query hooks

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: logInApi,
    onSuccess: (data) => {
      setUser(data);
      queryClient.setQueryData(['user'], data);
    },
    onError: (err: ApiError) => {
      console.log(err);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      setUser(data);
      queryClient.setQueryData(['user'], data);
    },
    onError: (err: ApiError) => {
      console.log(err);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
    onError: (err: ApiError) => {
      console.log(err);
    },
  });
};

export default useAuthStore;
