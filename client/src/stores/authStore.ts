import { create } from 'zustand';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import z from 'zod';
import { User, Profile, UserSignUp, UserLogIn } from '@shared/index';
import api from '../app/axios';

type TUserSignUp = z.infer<typeof UserSignUp>;
type TUserLogin = z.infer<typeof UserLogIn>;

// API functions
const loginApi = (data: TUserLogin) => api.post('/auth/login', data);
const signupApi = (data: TUserSignUp) => api.post('/auth/signup', data);
const getUserApi = () => api.get('/user');
const logoutApi = () => api.post('/logout');

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

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
