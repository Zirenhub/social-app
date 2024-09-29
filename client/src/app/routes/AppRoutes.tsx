import { createBrowserRouter } from 'react-router-dom';
import AuthWrapper from './wrapper/AuthWrapper';
import Layout from '../../components/layout/Layout';
import Home from '../pages/home/Home';

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
            path: 'profile',
            children: [
              {
                index: true,
                element: <div>Testing</div>,
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
