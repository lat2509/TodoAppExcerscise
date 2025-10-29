import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface AuthState {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

interface User {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

const useAuthStore = create(
  persist<AuthState>(
    set => ({
      user: null,
      login: userData => {
        set({
          user: userData,
        });
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
