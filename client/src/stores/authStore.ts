import { create } from 'zustand';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User, Profile } from '@shared/index';
import { loginApi, logoutApi, signupApi } from '../api/userApi';

type TUser = Omit<User, 'passwordHash'> & { profile: Profile };

type TAuthState = {
  user: TUser | null;
  isAuthenticated: boolean;
  setUser: (user: TUser) => void;
  logout: () => void;
};

const useAuthStore = create<TAuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: TUser) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// React Query hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUser(data.data.data);
      queryClient.setQueryData(['user'], data.data.data);
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      setUser(data.data.data);
      queryClient.setQueryData(['user'], data.data.data);
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
  });
};

// export const useUser = () => {
//   const setUser = useAuthStore((state) => state.setUser);

//   return useQuery({ queryKey: ['user'] }, getUserApi, {
//     onSuccess: (data) => {
//       setUser(data.data);
//     },
//     onError: () => {
//       setUser(null);
//     },
//     retry: false,
//     refetchOnWindowFocus: false,
//   });
// };

export default useAuthStore;
