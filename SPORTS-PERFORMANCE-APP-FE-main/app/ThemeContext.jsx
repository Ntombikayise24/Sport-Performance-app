import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();

  const [theme, setTheme] = useState('system');

  // Determine the effective theme based on system or user selection
  const getEffectiveTheme = () => {
    if (theme === 'system') {
      return colorScheme || 'light';
    }
    return theme;
  };

  const [effectiveTheme, setEffectiveTheme] = useState(getEffectiveTheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === 'system') {
        setEffectiveTheme(colorScheme);
      }
    });
    setEffectiveTheme(getEffectiveTheme());
    return () => subscription.remove();
  }, [theme]);

  const value = {
    theme,
    setTheme,
    effectiveTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
