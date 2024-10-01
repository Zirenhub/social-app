import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useAuthStore, { useLogout } from '../../stores/authStore';
import {
  modalVariants,
  slideAboveVariants,
  slideLeftVariants,
} from '../../constants/constants';
import { toast } from 'react-toastify';

const Layout = () => {
  const [userOptionsModal, setUserOptionsModal] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();
  const navLinks = [
    { value: 'Home', to: '/' },
    { value: 'Profile', to: 'profile' },
  ];

  const { mutate: logout, error } = useLogout();

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideLeftVariants}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="flex-1 flex backdrop-blur-lg"
    >
      <nav className="basis-1/5 flex flex-col justify-between bg-third/75 shadow-lg rounded-xl m-[2px]">
        <ul className="flex flex-col gap-3 m-4">
          {navLinks.map((link) => (
            <li
              key={link.value}
              onClick={() => navigate(link.to)}
              className="text-2xl hover:underline underline-offset-4 bg-primary text-fourth shadow-md px-4 py-3 rounded-full cursor-pointer transition-all transform hover:scale-105"
            >
              <Link to={link.to}>{link.value}</Link>
            </li>
          ))}
        </ul>

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
            <div className="w-16 h-16 rounded-full bg-default-pfp bg-cover bg-center border-2 border-secondary shadow-lg"></div>
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

      <main className="flex-grow p-2 bg-primary text-fourth shadow-inner rounded-xl m-[2px]">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={slideAboveVariants}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="p-5 bg-white/70 backdrop-blur-md shadow-xl rounded-lg"
        >
          <Outlet />
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Layout;
