import { create } from "zustand";
import { persist } from "zustand/middleware";

import { client } from "@/utils/ApolloProvider";

export const useUserStore = create(
    persist(
        (set) => ({
            token: null,
            setToken: (token,) => {
                // eslint-disable-next-line no-unused-vars
                set((state) => ({
                    token,
                }));
                // Clear the store to avoid any stale data...
                client.resetStore();
            },
            login: (token) => {
                // eslint-disable-next-line no-unused-vars
                set((state) => ({
                    token,
                }));
            },
            logout: () => {
                // eslint-disable-next-line no-unused-vars
                set((state) => ({
                    token: null,
                }));
                // Clear the store to avoid any stale data...
                client.resetStore();
            },
        }),
        {
            name: "user-store", // name of the item in the storage (must be unique)
            getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
        }
    )
);

export default useUserStore;
