import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogIn from '../../../components/auth/LogIn';
import SignUp from '../../../components/auth/SignUp';

type AuthType = 'signup' | 'login';

const containerVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const slideVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  visible: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

function Auth() {
  const [authType, setAuthType] = useState<AuthType>('signup');
  const [direction, setDirection] = useState(1);

  const toggleAuthType = () => {
    setDirection(authType === 'signup' ? -1 : 1);
    setAuthType((prev) => (prev === 'signup' ? 'login' : 'signup'));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Content Transition */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={authType}
            custom={direction}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
              duration: 0.5,
            }}
            className="px-3 py-1 pt-5"
          >
            {authType === 'signup' ? <SignUpContent /> : <LoginContent />}
          </motion.div>
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.div
          className="w-full text-center py-4 bg-green-500 text-white font-bold text-lg cursor-pointer transition-transform transform hover:scale-105 active:scale-95"
          onClick={toggleAuthType}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {authType === 'signup'
            ? 'Already have an account? Log In'
            : 'Create an account'}
        </motion.div>
      </motion.div>
    </div>
  );
}

function SignUpContent() {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold text-green-700">Join Kquirtz</h2>
      <p className="text-lg text-gray-600">
        Sign up to connect with friends and share your moments.
      </p>
      <SignUp />
    </div>
  );
}

function LoginContent() {
  return (
    <div className="text-center space-y-6 pb-4">
      <h2 className="text-3xl font-bold text-green-700">Welcome Back</h2>
      <p className="text-lg text-gray-600">
        Log in to continue your journey with Kquirtz.
      </p>
      <LogIn />
    </div>
  );
}

export default Auth;
