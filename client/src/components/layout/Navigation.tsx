import { useState } from 'react';
import useAuthStore from '../../stores/authStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CreatePostModal from '../post/CreatePostModal';
import UserBar from './UserBar';

function Navigation() {
  const [postModal, setPostModal] = useState<boolean>(false);
  const [notificationsSideBar, setNotificationsSideBar] =
    useState<boolean>(false);
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navLinks = [
    { value: 'Home', to: '/', svg: 'bg-home' },
    {
      value: 'Profile',
      to: user?.profile.username as string,
      svg: 'bg-profile',
    },
  ];
  const interactions = [
    {
      value: 'Notifications',
      action: () => setNotificationsSideBar(!notificationsSideBar),
    },
    { value: 'Create New Post', action: () => setPostModal(!postModal) },
  ];

  const isCurrentPath = (path: string) => {
    // pathname starts with "/" react router link's to property must start without /
    // remove / if we are not at home and check if path param equals to pathname
    // doing this to hightlight the link button for the current path
    if (pathname === '/' && path === '/') {
      return true;
    } else if (pathname !== '/') {
      return pathname.slice(1) === path;
    }
    return false;
  };

  return (
    <nav className="flex flex-col justify-between bg-third/75 shadow-lg rounded-xl m-1">
      <ul className="flex flex-col gap-3 m-4 h-full">
        {navLinks.map((link) => (
          <li
            key={link.value}
            onClick={() => navigate(link.to)}
            className="text-lg flex items-center gap-3 hover:underline underline-offset-4 bg-primary text-fourth shadow-md px-4 py-3 rounded-full cursor-pointer transition-all transform hover:scale-105"
          >
            <div className={`w-8 h-8 ${link.svg} bg-cover bg-center`} />
            <p className={isCurrentPath(link.to) ? 'font-bold' : ''}>
              {link.value}
            </p>
          </li>
        ))}
        <div className="flex flex-col mt-auto gap-2">
          {interactions.map((interaction) => (
            <button
              key={interaction.value}
              onClick={interaction.action}
              className="text-lg bg-primary text-fourth shadow-md px-4 py-3 rounded-full cursor-pointer transition-all transform hover:scale-105 hover:bg-fourth hover:text-primary"
            >
              {interaction.value}
            </button>
          ))}
        </div>
      </ul>

      {postModal && (
        <AnimatePresence>
          <CreatePostModal close={() => setPostModal(false)} />
        </AnimatePresence>
      )}

      {/* show notifications side bar */}

      <UserBar user={user} />
    </nav>
  );
}

export default Navigation;
