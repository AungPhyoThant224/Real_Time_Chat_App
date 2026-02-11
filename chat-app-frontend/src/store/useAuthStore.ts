import { create } from "zustand";
import { User } from "@/types";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    Cookies.remove("token");
    set({ user: null });
  },
}));
