import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const savedToken = localStorage.getItem('token');
const savedUser = localStorage.getItem('user');

let initialUser: User | null = null;
try {
  if (savedUser) {
    initialUser = JSON.parse(savedUser);
  }
} catch (e) {
  console.error('Failed to parse user from localStorage', e);
}

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  token: savedToken,
  isAuthenticated: !!savedToken,
  login: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

