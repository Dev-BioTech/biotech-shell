import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  selectedFarm: null,

  setAuth: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
    }),

  setSelectedFarm: (farm) =>
    set({
      selectedFarm: farm,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      selectedFarm: null,
    }),
}));
