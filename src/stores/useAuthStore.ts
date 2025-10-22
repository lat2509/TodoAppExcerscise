import { create } from 'zustand';
import axiosClient from '../axios-config/axiosClient';
import { persist } from 'zustand/middleware';
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (userData: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

const useAuthStore = create(
  persist<AuthState>(
    set => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      login: (userData, accessToken, refreshToken) => {
        axiosClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
        set({
          user: userData,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      },
      logout: () => {
        delete axiosClient.defaults.headers['Authorization'];
        set({ user: null, accessToken: null, refreshToken: null });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
