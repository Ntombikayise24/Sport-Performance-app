import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useColorScheme } from './useColorScheme';

export type ThemePreference = 'system' | 'light' | 'dark';

const THEME_PREFERENCE_KEY = '@theme_preference';

export function useThemePreference() {
  const systemTheme = useColorScheme();
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');

  // Load theme preference from storage on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (stored && ['system', 'light', 'dark'].includes(stored)) {
          setThemePreference(stored as ThemePreference);
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
      }
    };

    loadThemePreference();
  }, []);

  // Save theme preference to storage when it changes
  const updateThemePreference = async (newPreference: ThemePreference) => {
    try {
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, newPreference);
      setThemePreference(newPreference);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  // Determine the actual theme to use
  const effectiveTheme = themePreference === 'system' ? systemTheme : themePreference;

  return {
    themePreference,
    effectiveTheme: effectiveTheme ?? 'light',
    updateThemePreference,
  };
}
