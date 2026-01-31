import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isTokenExpired } from "../utils/jwt";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      selectedFarm: null,

      setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth-change"));
        }
      },

      setSelectedFarm: (farm) => {
        set({
          selectedFarm: farm,
        });
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth-change"));
        }
      },

      isTokenValid: () => {
        const { token, isAuthenticated } = get();
        if (!isAuthenticated || !token) return false;

        // Use the local utility to check expiration
        const expired = isTokenExpired(token);
        if (expired) {
          console.warn("AuthStore (Shell): Token expired, logging out...");
          // We can't call logout() directly here easily without recursion if not careful,
          // but we can return false and let the caller handle it.
        }
        return !expired;
      },

      logout: () => {
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

        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth-change"));
        }
      },
    }),
    {
      name: "auth-storage", // unique name for localStorage key
    },
  ),
);
