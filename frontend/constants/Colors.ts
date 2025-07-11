/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const mysticalPaletteLight = {
  purple: '#a78bfa',
  indigo: '#818cf8',
  teal: '#5eead4',
  gold: '#fcd34d',
};

const mysticalPaletteDark = {
  purple: '#7c3aed',
  indigo: '#6366f1',
  teal: '#2dd4bf',
  gold: '#fbbf24',
};

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    ...mysticalPaletteLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    ...mysticalPaletteDark,
  },
};
