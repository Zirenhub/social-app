import { createBrowserRouter } from 'react-router-dom';
import AuthWrapper from './wrapper/AuthWrapper';
import Layout from '../../components/layout/Layout';
import Home from '../pages/home/Home';
import Profile from '../pages/profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthWrapper />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: ':username',
            children: [
              {
                index: true,
                element: <Profile />,
              },
              // {
              //   path: 'settings',
              //   element: <ProfileSettings />,
              // },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
