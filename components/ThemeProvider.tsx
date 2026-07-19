// ThemeProvider.tsx
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { lightTheme, darkTheme } from '../theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme('light');
  }, [setColorScheme]);

  const themeVars = colorScheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const root = document.documentElement;
    const vars: Record<string, string> =
      (themeVars as any).__cssVars ?? themeVars;
    const prev: Record<string, string> = {};
    for (const [key, value] of Object.entries(vars)) {
      prev[key] = root.style.getPropertyValue(key);
      root.style.setProperty(key, String(value));
    }
    root.classList.remove('light', 'dark');
    if (colorScheme) root.classList.add(colorScheme);
    return () => {
      for (const key of Object.keys(vars)) {
        if (prev[key]) root.style.setProperty(key, prev[key]);
        else root.style.removeProperty(key);
      }
    };
  }, [themeVars, colorScheme]);

  return (
    <View style={themeVars} className={`${colorScheme} flex-1 bg-background`}>
      {children}
    </View>
  );
}
