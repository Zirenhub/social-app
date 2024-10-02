import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  slideAboveVariants,
  slideLeftVariants,
} from '../../constants/constants';
import Navigation from './Navigation';

const Layout = () => {
  const location = useLocation();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideLeftVariants}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="flex-1 flex backdrop-blur-lg"
    >
      <Navigation />

      <main className="flex-grow p-2 bg-primary text-fourth shadow-inner rounded-xl m-1">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={slideAboveVariants}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="bg-white/70 backdrop-blur-md shadow-xl rounded-lg"
        >
          <Outlet />
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Layout;
