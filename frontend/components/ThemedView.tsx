import { ImageBackground, type ViewProps } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

import { useThemeColor } from '@/hooks/useThemeColor';
import { starryDark, starryLight } from '../assets/imageData';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

const textures = {
  light: { uri: starryLight },
  dark: { uri: starryDark },
} as const;

export function ThemedView({ style, lightColor, darkColor, children, ...otherProps }: ThemedViewProps) {
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <ImageBackground
      source={textures[theme]}
      style={[{ backgroundColor }, style]}
      resizeMode="cover"
      {...otherProps}>
      {children}
    </ImageBackground>
  );
}
