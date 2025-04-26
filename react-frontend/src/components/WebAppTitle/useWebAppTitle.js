import { create } from "zustand";

export const useFullScreenStore = create((set) => ({
  title: import.meta.env.VITE_PUBLIC_SITE_NAME ?? "App",
  changeTitle: (newTitle) => {
    // eslint-disable-next-line no-unused-vars
    set((state) => ({
      title: newTitle,
    }));
  },
}));

export default useFullScreenStore;
