import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TLayout = {
  isNotificationsSidebarOpen: boolean;
  isPostModalOpen: boolean;
  isUserOptionsOpen: boolean;
  toggleNotificationsSidebar: () => void;
  togglePostModal: () => void;
  toggleUserOptions: () => void;
};

const useLayoutStore = create<TLayout>()(
  devtools((set) => ({
    isNotificationsSidebarOpen: false,
    isPostModalOpen: false,
    isUserOptionsOpen: false,
    toggleNotificationsSidebar: () =>
      set((state) => ({
        isNotificationsSidebarOpen: !state.isNotificationsSidebarOpen,
      })),
    togglePostModal: () =>
      set((state) => ({ isPostModalOpen: !state.isPostModalOpen })),
    toggleUserOptions: () =>
      set((state) => ({ isUserOptionsOpen: !state.isUserOptionsOpen })),
  }))
);

export default useLayoutStore;
