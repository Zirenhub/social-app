import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TLayout = {
  isNotificationsSidebarOpen: boolean;
  isPostModalOpen: boolean;
  isUserOptionsOpen: boolean;
  isProfileEditOpen: boolean;
  toggleNotificationsSidebar: () => void;
  togglePostModal: () => void;
  toggleUserOptions: () => void;
  toggleProfileEdit: () => void;
};

const useLayoutStore = create<TLayout>()(
  devtools((set) => ({
    isNotificationsSidebarOpen: false,
    isPostModalOpen: false,
    isUserOptionsOpen: false,
    isProfileEditOpen: false,
    toggleNotificationsSidebar: () =>
      set((state) => ({
        isNotificationsSidebarOpen: !state.isNotificationsSidebarOpen,
      })),
    togglePostModal: () =>
      set((state) => ({ isPostModalOpen: !state.isPostModalOpen })),
    toggleUserOptions: () =>
      set((state) => ({ isUserOptionsOpen: !state.isUserOptionsOpen })),
    toggleProfileEdit: () =>
      set((state) => ({ isProfileEditOpen: !state.isProfileEditOpen })),
  }))
);

export default useLayoutStore;
