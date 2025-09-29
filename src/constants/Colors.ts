/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,

    // App-specific colors
    primary: "#1A394B", // Main app background color
    secondary: "#005A9C", // Role buttons, login button
    accent: "#DE1966", // Selected states, signup links
    surface: "#D9D9D9", // Cards, buttons, inputs
    surfaceVariant: "#0F2C3C", // Input backgrounds
    divider: "#08ee70ff", // Green dividers
    muted: "#ccc", // Placeholder text, secondary text
    error: "#DF1965", // Error states, delete buttons
    success: "#4CAF50", // Success states
    warning: "#FFA500", // Warning states
    info: "#2196F3", // Info states

    // Border colors
    border: "#E0E0E0",
    borderDark: "#B0B0B0",

    // Switch colors
    switchTrackFalse: "#767577",
    switchTrackTrue: "#81b0ff",
    switchThumbFalse: "#f4f3f4",
    switchThumbTrue: "#f5dd4b",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,

    // App-specific colors adapted for dark mode
    primary: "#0F1419", // Darker version of main background
    secondary: "#1E3A8A", // Darker blue for role buttons
    accent: "#EC4899", // Lighter pink for selected states
    surface: "#374151", // Dark gray for cards and buttons
    surfaceVariant: "#1F2937", // Darker input backgrounds
    divider: "#10B981", // Green dividers (slightly darker)
    muted: "#9CA3AF", // Muted text for dark mode
    error: "#EF4444", // Error red for dark mode
    success: "#22C55E", // Success green for dark mode
    warning: "#F59E0B", // Warning orange for dark mode
    info: "#3B82F6", // Info blue for dark mode

    // Border colors for dark mode
    border: "#374151",
    borderDark: "#4B5563",

    // Switch colors (same as light for consistency)
    switchTrackFalse: "#767577",
    switchTrackTrue: "#81b0ff",
    switchThumbFalse: "#f4f3f4",
    switchThumbTrue: "#f5dd4b",
  },
};
