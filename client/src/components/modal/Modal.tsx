import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { scaleVariants } from '../../constants/constants';

type ChildrenProps = {
  toggle: () => void;
  title: string;
};

type Props = {
  props: ChildrenProps;
  children: ReactNode;
};

function Modal({ props, children }: Props) {
  const { toggle, title } = props;

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
        <div className="relative flex flex-col z-40 p-4 bg-primary rounded-xl shadow-xl text-secondary">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={toggle}
              className="text-lg text-fourth hover:text-secondary transition-colors"
            >
              X
            </button>
            <p className="font-semibold text-lg">{title}</p>
          </div>
          {children}
        </div>
      </motion.div>
    </>
  );
}

export default Modal;
