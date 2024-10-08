import { create } from 'zustand';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TAuthUserApi } from 'shared';
import { logInApi, logoutApi, signupApi } from '../api/userApi';
import { ApiError } from '../api/error';
import { devtools } from 'zustand/middleware';

type TAuthStore = {
  user: TAuthUserApi | null;
  isAuthenticated: boolean;
  setUser: (user: TAuthUserApi) => void;
  logout: () => void;
};

const useAuthStore = create<TAuthStore>()(
  devtools((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user: TAuthUserApi) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
  }))
);

// React Query hooks

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
