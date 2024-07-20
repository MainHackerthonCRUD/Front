import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCookies } from "react-cookie";

const useAuthStore = create(
    persist(
      (set) => ({
        isAuthenticated: false,
        login: (setCookie) => {
          setCookie('isAuthenticated', true, { path: '/' });
          set({ isAuthenticated: true });
        },
        logout: (removeCookie) => {
          removeCookie('isAuthenticated', { path: '/' });
          set({ isAuthenticated: false });
        },
      }),
      {
        name: 'auth-info',
      }
    )
  );

export default useAuthStore;