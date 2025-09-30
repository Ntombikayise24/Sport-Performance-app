import React, { createContext, useContext, ReactNode } from 'react';

import { useThemePreference, ThemePreference } from '../hooks/useThemePreference';
import { Colors } from '../constants/Colors';

interface ThemeContextType {
  themePreference: ThemePreference;
  effectiveTheme: ThemePreference;
  updateThemePreference: (preference: ThemePreference) => Promise<void>;
  colors: typeof Colors.light;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeData = useThemePreference();
  const colors = Colors[themeData.effectiveTheme];

  return (
    <ThemeContext.Provider value={{ ...themeData, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
