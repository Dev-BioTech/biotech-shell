import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      selectedFarm: null,
      _hasHydrated: false,

      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },

      setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });

        // Event for other MFs to react
        window.dispatchEvent(
          new CustomEvent("auth:login", {
            detail: { user, token },
          })
        );
      },

      setSelectedFarm: (farm) => {
        set({
          selectedFarm: farm,
        });

        // Event for other MFs to react
        window.dispatchEvent(
          new CustomEvent("farm:selected", {
            detail: farm,
          })
        );
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      logout: () => {
        // Event for other MFs to react
        window.dispatchEvent(new CustomEvent("auth:logout"));

        // Clear the state
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          selectedFarm: null,
        });

        // Explicitly remove from localStorage
        localStorage.removeItem("auth-storage");

        // Clear any related cookies
        document.cookie.split(";").forEach((cookie) => {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie =
            name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        });
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
