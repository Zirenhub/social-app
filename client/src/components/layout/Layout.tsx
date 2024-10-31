import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  slideAboveVariants,
  slideLeftVariants,
} from '../../constants/constants';
import Navigation from './Navigation';
import Notifications from './Notifications';
import useLayoutStore from '../../stores/layoutStore';
import Modal from '../modal/Modal';
import CreatePost from '../post/CreatePost';
import ProfileEdit from '../profile/ProfileEdit';

const Layout = () => {
  const {
    isNotificationsSidebarOpen,
    isProfileEditOpen,
    isPostModalOpen,
    togglePostModal,
    toggleProfileEdit,
  } = useLayoutStore();
  const location = useLocation();

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
        <Navigation />
        <main className="flex-grow p-2 bg-primary text-fourth shadow-inner rounded-xl m-1 flex">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideAboveVariants}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="bg-white/70 backdrop-blur-md shadow-xl rounded-lg h-full w-full overflow-y-auto scroll relative"
          >
            <Outlet />
          </motion.div>
          {isNotificationsSidebarOpen && <Notifications />}
          <AnimatePresence>
            {isPostModalOpen && (
              <Modal
                props={{ toggle: togglePostModal, title: 'Create a New Post!' }}
              >
                <CreatePost />
              </Modal>
            )}
            {isProfileEditOpen && (
              <Modal
                props={{ toggle: toggleProfileEdit, title: 'Edit Profile' }}
              >
                <ProfileEdit />
              </Modal>
            )}
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
};

export default Layout;
