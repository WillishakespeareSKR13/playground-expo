import { useAppStore } from "@/store/zustand";
import { useEffect } from "react";
import { UnistylesRuntime } from "react-native-unistyles";

export function useThemeToggle() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    UnistylesRuntime.setTheme(next);
  };

  useEffect(() => {
    setTheme(UnistylesRuntime.themeName as "light" | "dark");
  }, [UnistylesRuntime.themeName]);

  return { theme, toggle };
}
