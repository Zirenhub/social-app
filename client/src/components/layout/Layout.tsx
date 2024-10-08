import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  slideAboveVariants,
  slideLeftVariants,
} from '../../constants/constants';
import Navigation from './Navigation';
import { useState } from 'react';
import Notifications from './Notifications';

const Layout = () => {
  const location = useLocation();
  const [notificationsSideBar, setNotificationsSideBar] =
    useState<boolean>(false);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideLeftVariants}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="flex h-screen w-full"
    >
      <div className="flex flex-1 backdrop-blur-lg">
        <Navigation
          toggleNotifSideBar={() =>
            setNotificationsSideBar(!notificationsSideBar)
          }
        />
        <main className="flex-grow p-2 bg-primary text-fourth shadow-inner rounded-xl m-1 flex">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideAboveVariants}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="bg-white/70 backdrop-blur-md shadow-xl rounded-lg h-full w-full overflow-y-auto scroll"
          >
            <Outlet />
          </motion.div>
          {notificationsSideBar && <Notifications />}
        </main>
      </div>
    </motion.div>
  );
};

export default Layout;
