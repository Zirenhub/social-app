import create from 'zustand';
import { persist } from 'zustand/middleware';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import z from 'zod';
import { User, Profile, UserSignUp } from '@shared/index';
import api from '../app/axios';

type TUserSignUp = z.infer<typeof UserSignUp>;

// API functions
const loginApi = (data) => api.post('/auth/login', data);
const signupApi = (data: TUserSignUp) => api.post('/auth/signup', data);
const getUserApi = () => api.get('/user');
const logoutApi = () => api.post('/logout');

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// React Query hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation(loginApi, {
    onSuccess: (data) => {
      setUser(data.data.user);
      queryClient.setQueryData('user', data.data.user);
    },
  });
};

export const useUser = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery('user', getUserApi, {
    onSuccess: (data) => {
      setUser(data.data);
    },
    onError: () => {
      setUser(null);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  return useMutation(logoutApi, {
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
  });
};

export default useAuthStore;
