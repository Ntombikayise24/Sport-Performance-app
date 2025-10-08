import React, { createContext, useContext, ReactNode } from "react";
import { useThemePreference, ThemePreference } from "../hooks/useThemePreference";
import { Colors } from "../constants/Colors";

interface ThemeContextType {
  themePreference: ThemePreference;
  updateThemePreference: (preference: ThemePreference) => void;
  colors: typeof Colors.light | typeof Colors.dark;
  effectiveTheme: ThemePreference;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { themePreference, updateThemePreference, effectiveTheme } = useThemePreference();

  return (
    <ThemeContext.Provider
      value={{
        themePreference,
        updateThemePreference,
        colors: Colors[effectiveTheme],
        effectiveTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
