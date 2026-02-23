import { UnistylesRuntime } from 'react-native-unistyles';
import { useAppStore } from '@/store/zustand';

export function useThemeToggle() {
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    toggleTheme();
    UnistylesRuntime.setTheme(next);
  };

  return { theme, toggle };
}
