import { Outlet } from 'react-router-dom';
import useAuthStore from '../../../stores/authStore';
import Auth from '../../pages/auth/Auth';
import { useQuery } from '@tanstack/react-query';
import { whoAmiApi } from '../../../api/userApi';
import { useEffect } from 'react';

const AuthWrapper = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  const { data, isPending, error } = useQuery({
    queryKey: ['whoami'],
    queryFn: whoAmiApi,
    retry: false, // Default is retry for 3 times if getting error from server
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isPending) {
    return <div>Loading!</div>;
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

  return <Outlet />;
};

export default AuthWrapper;
