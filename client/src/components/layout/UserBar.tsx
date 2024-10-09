import ProfilePicture from '../profile/ProfilePicture';
import { modalVariants } from '../../constants/constants';
import { useLogout } from '../../stores/authStore';
import { AnimatePresence, motion } from 'framer-motion';
import { TAuthUserApi } from 'shared';
import useLayoutStore from '../../stores/layoutStore';
import { toast } from 'react-toastify';

type Props = {
  user: TAuthUserApi | null;
};

function UserBar({ user }: Props) {
  const { mutate: logout } = useLogout({
    onSuccess: () => toast.success('Successfully logged out!'),
  });
  const { isUserOptionsOpen, toggleUserOptions } = useLayoutStore();

  return (
    <div
      onClick={toggleUserOptions}
      className={`flex justify-between items-center cursor-pointer select-none rounded-lg relative m-4 p-3 transition-all bg-secondary/80 ${isUserOptionsOpen && 'bg-[#664343]'} text-white shadow-md backdrop-blur-md`}
    >
      <AnimatePresence>
        {isUserOptionsOpen && (
          <motion.div
            variants={modalVariants}
            key={'modal'}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-fourth text-primary absolute -top-1 right-0 py-2 px-4 rounded-lg z-10 shadow-xl"
          >
            <button
              className="font-medium text-sm hover:underline underline-offset-4 transition-transform transform hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                logout({});
              }}
            >
              Log Out @{user?.profile.username}
            </button>
            <div className="absolute -bottom-[18px] right-2">&#9660;</div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex gap-1 items-center">
        <ProfilePicture
          styles={'w-12 h-12 border-2 border-secondary shadow-lg'}
        />
        <div className="flex flex-col">
          <span className="text-md font-bold text-primary truncate">
            {user?.profile.firstName} {user?.profile.lastName}
          </span>
          <span className="text-sm text-primary">
            @{user?.profile.username}
          </span>
        </div>
      </div>
      <div className="bg-ellipsis bg-cover bg-center h-4 w-4 ml-8"></div>
    </div>
  );
}

export default UserBar;
