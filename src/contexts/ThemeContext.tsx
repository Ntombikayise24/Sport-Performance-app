import React, { createContext, useContext, useState, useEffect } from "react";

const defaultColors = {
  background: "#ffffff",
  text: "#000000",
  primary: "#007AFF",
  surface: "#f2f2f2",
  surfaceVariant: "#e0e0e0",
  switchTrackFalse: "#767577",
  switchTrackTrue: "#81b0ff",
  switchThumbFalse: "#f4f3f4",
  switchThumbTrue: "#f5dd4b",
};

const darkColors = {
  background: "#121212",
  text: "#ffffff",
  primary: "#0A84FF",
  surface: "#1E1E1E",
  surfaceVariant: "#2C2C2C",
  switchTrackFalse: "#767577",
  switchTrackTrue: "#81b0ff",
  switchThumbFalse: "#f4f3f4",
  switchThumbTrue: "#f5dd4b",
};

type ThemePreference = "system" | "light" | "dark";

interface ThemeContextProps {
  themePreference: ThemePreference;
  updateThemePreference: (preference: ThemePreference) => void;
  colors: typeof defaultColors;
  effectiveTheme: ThemePreference;
}

const ThemeContext = createContext<ThemeContextProps>({
  themePreference: "system",
  updateThemePreference: () => {},
  colors: defaultColors,
  effectiveTheme: "light",
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themePreference, setThemePreference] = useState<ThemePreference>("system");
  const [effectiveTheme, setEffectiveTheme] = useState<ThemePreference>("light");

  useEffect(() => {
    // For simplicity, we just use themePreference as effectiveTheme
    // In real app, you might want to detect system theme here
    if (themePreference === "system") {
      setEffectiveTheme("light");
    } else {
      setEffectiveTheme(themePreference);
    }
  }, [themePreference]);

  const updateThemePreference = (preference: ThemePreference) => {
    setThemePreference(preference);
  };

  const colors = effectiveTheme === "dark" ? darkColors : defaultColors;

  return (
    <ThemeContext.Provider value={{ themePreference, updateThemePreference, colors, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
