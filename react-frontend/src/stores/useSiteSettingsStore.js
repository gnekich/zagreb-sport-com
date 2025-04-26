import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSiteSettingsStore = create(
    persist(
        (set) => ({
            theme: "light", // Default theme
            size: "medium", // Default size
            availableThemes: ["light", "dark", "blue"], // List of available themes
            availableSizes: ["small", "medium", "large"], // List of available sizes

            setTheme: (theme) => {
                set((state) => ({
                    theme: state.availableThemes.includes(theme) ? theme : state.theme,
                }));
            },

            setSize: (size) => {
                set((state) => ({
                    size: state.availableSizes.includes(size) ? size : state.size,
                }));
            },
        }),
        {
            name: "site-settings", // Name of the item in the storage (must be unique)
            getStorage: () => localStorage, // Use localStorage by default
        }
    )
);

export default useSiteSettingsStore;