import { create } from "zustand";

interface AppStore {
  count: number;
  theme: "light" | "dark";
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  count: 0,
  theme: "light",
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setTheme: (theme: "light" | "dark") => set({ theme }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
