import { Outlet } from 'react-router-dom';
import useAuthStore, { useWhoAmI } from '../../../stores/authStore';
import Auth from '../../pages/auth/Auth';
import { useEffect } from 'react';

const AuthWrapper = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  const { data, isPending, error } = useWhoAmI();

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
