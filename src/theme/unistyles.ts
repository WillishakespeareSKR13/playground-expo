import { StyleSheet } from "react-native-unistyles";

const lightTheme = {
  colors: {
    background: "#FFFFFF",
    surface: "#F5F5F5",
    text: "#1A1A1A",
    textSecondary: "#666666",
    primary: "#6C63FF",
    primaryLight: "#A5A0FF",
    accent: "#FF6B6B",
    border: "#E0E0E0",
    card: "#FFFFFF",
    success: "#4CAF50",
    error: "#F44336",
    warning: "#FF9800",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: "700" as const },
    h2: { fontSize: 24, fontWeight: "600" as const },
    h3: { fontSize: 20, fontWeight: "600" as const },
    body: { fontSize: 16, fontWeight: "400" as const },
    caption: { fontSize: 12, fontWeight: "400" as const },
  },
};

const darkTheme: typeof lightTheme = {
  colors: {
    background: "#121212",
    surface: "#1E1E1E",
    text: "#F5F5F5",
    textSecondary: "#AAAAAA",
    primary: "#8B83FF",
    primaryLight: "#6C63FF",
    accent: "#FF8A80",
    border: "#333333",
    card: "#1E1E1E",
    success: "#66BB6A",
    error: "#EF5350",
    warning: "#FFA726",
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  typography: lightTheme.typography,
};

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  settings: {
    initialTheme: "dark",
  },
});
