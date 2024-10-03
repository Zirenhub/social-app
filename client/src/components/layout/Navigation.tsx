import { useEffect, useState } from 'react';
import useAuthStore, { useLogout } from '../../stores/authStore';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { modalVariants } from '../../constants/constants';
import CreatePostModal from '../post/CreatePostModal';
import ProfilePicture from '../profile/ProfilePicture';

function Navigation() {
  const [userOptionsModal, setUserOptionsModal] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);

  const { mutate: logout, error } = useLogout();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navLinks = [
    { value: 'Home', to: '/', svg: 'bg-home' },
    { value: 'Profile', to: 'profile', svg: 'bg-profile' },
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

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  return (
    <nav className="basis-1/5 flex flex-col justify-between bg-third/75 shadow-lg rounded-xl m-1">
      <ul className="flex flex-col gap-3 m-4 h-full">
        {navLinks.map((link) => (
          <li
            key={link.value}
            onClick={() => navigate(link.to)}
            className="text-2xl flex items-center gap-3 hover:underline underline-offset-4 bg-primary text-fourth shadow-md px-4 py-3 rounded-full cursor-pointer transition-all transform hover:scale-105"
          >
            <div className={`w-8 h-8 ${link.svg} bg-cover bg-center`} />
            <Link
              to={link.to}
              className={isCurrentPath(link.to) ? 'font-bold' : ''}
            >
              {link.value}
            </Link>
          </li>
        ))}
        <button
          onClick={() => setPostModal(!postModal)}
          className="mt-auto text-2xl bg-primary text-fourth shadow-md px-4 py-3 rounded-full cursor-pointer transition-all transform hover:scale-105 hover:bg-fourth hover:text-primary"
        >
          Create New Post
        </button>
      </ul>
      {postModal && (
        <AnimatePresence>
          <CreatePostModal close={() => setPostModal(false)} />
        </AnimatePresence>
      )}
      <div
        onClick={() => setUserOptionsModal(!userOptionsModal)}
        className={`flex justify-between items-center cursor-pointer select-none rounded-lg relative m-4 p-3 transition-all bg-secondary/80 ${userOptionsModal && 'bg-[#664343]'} text-white shadow-md backdrop-blur-md`}
      >
        <AnimatePresence>
          {userOptionsModal && (
            <motion.div
              variants={modalVariants}
              key={'modal'}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-fourth text-primary -top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 absolute py-2 px-4 rounded-lg z-10 shadow-xl"
            >
              <button
                className="font-bold hover:underline underline-offset-4 transition-transform transform hover:scale-105"
                onClick={(e) => {
                  e.stopPropagation();
                  logout({});
                }}
              >
                Log Out @{user?.profile.username}
              </button>
              <div className="absolute top-[25px] left-3/4">&#9660;</div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-4 items-center">
          <ProfilePicture
            styles={'w-16 h-16 border-2 border-secondary shadow-lg'}
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary truncate">
              {user?.profile.firstName} {user?.profile.lastName}
            </span>
            <span className="text-sm text-primary">
              @{user?.profile.username}
            </span>
          </div>
        </div>
        <div className="bg-ellipsis bg-cover bg-center h-4 w-4 mr-3"></div>
      </div>
    </nav>
  );
}

export default Navigation;
