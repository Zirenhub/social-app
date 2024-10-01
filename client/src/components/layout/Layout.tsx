import { Link, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import useAuthStore from '../../stores/authStore';
import {
  modalVariants,
  slideAboveVariants,
  slideLeftVariants,
} from '../../constants/constants';

const Layout = () => {
  const [userOptionsModal, setUserOptionsModal] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const navLinks = [
    { value: 'Home', to: '/' },
    { value: 'Profile', to: 'profile' },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideLeftVariants}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="flex-1 flex"
    >
      <nav className="basis-1/5 border-r-2 flex flex-col justify-between">
        <ul className="flex flex-col gap-6 p-6">
          {navLinks.map((link) => (
            <li
              key={link.value}
              className="text-2xl hover:underline underline-offset-4"
            >
              <Link to={link.to}>{link.value}</Link>
            </li>
          ))}
        </ul>

        <div
          onClick={() => setUserOptionsModal(!userOptionsModal)}
          className="flex justify-between items-center cursor-pointer select-none rounded-lg bg-white relative hover:bg-gray-300/50 m-4 p-2 transition-all"
        >
          <AnimatePresence>
            {/* ^ Animate components when they're removed from the React tree. */}
            {userOptionsModal && (
              <motion.div
                variants={modalVariants}
                key={'modal'}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="-top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 absolute py-1 px-3 bg-black rounded-lg z-10"
              >
                <button
                  className="text-white font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserOptionsModal(false);
                  }}
                >
                  Log Out @{user?.profile.username}
                </button>
                <div className="absolute top-[25px] left-3/4">&#9660;</div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex gap-3 items-center">
            <div className="w-16 h-16 rounded-full bg-default-pfp bg-cover bg-center border-2 border-gray-200 shadow-lg"></div>
            <div className="flex flex-col">
              <span className="text-lg font-bold truncate text-gray-800">
                {user?.profile.firstName} {user?.profile.lastName}
              </span>
              <span className="text-sm text-gray-500">
                @{user?.profile.username}
              </span>
            </div>
          </div>
          <div className="bg-ellipsis bg-cover bg-center h-4 w-4 mr-3"></div>
        </div>
      </nav>

      <main className="flex-grow p-4">
        <motion.div
          key={location.pathname} // animate on page change
          initial="initial"
          animate="animate"
          exit="exit"
          variants={slideAboveVariants}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Outlet />
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Layout;
