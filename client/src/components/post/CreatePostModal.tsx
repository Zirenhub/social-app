import { scaleVariants } from '../../constants/constants';
import { motion } from 'framer-motion';
import useLayoutStore from '../../stores/layoutStore';
import CreatePost from './CreatePost';

function CreatePostModal() {
  const { togglePostModal } = useLayoutStore();

  return (
    <>
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-10" />
      <motion.div
        variants={scaleVariants}
        key="post-modal"
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-30 flex items-center justify-center"
      >
        <div className="relative z-40 p-4 bg-primary rounded-xl shadow-xl text-secondary w-[500px] max-w-full">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={togglePostModal}
              className="text-lg text-fourth hover:text-secondary transition-colors"
            >
              X
            </button>
            <p className="font-semibold text-lg">Create a New Post!</p>
          </div>
          <CreatePost onSuccessSideEffect={togglePostModal} />
        </div>
      </motion.div>
    </>
  );
}

export default CreatePostModal;
