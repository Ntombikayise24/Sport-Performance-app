import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useThemePreference, ThemePreference } from "../hooks/useThemePreference";
import { Colors } from "../constants/Colors";

interface ThemeContextType {
  themePreference: ThemePreference;
  updateThemePreference: (preference: ThemePreference) => void;
  colors: typeof Colors.light | typeof Colors.dark;
  effectiveTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { themePreference, updateThemePreference, effectiveTheme } = useThemePreference();

  const value = useMemo(() => ({
    themePreference,
    updateThemePreference,
    colors: Colors[effectiveTheme] ?? Colors.light,
    effectiveTheme,
  }), [themePreference, updateThemePreference, effectiveTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
