// ThemeProvider.tsx
import { useColorScheme } from 'nativewind';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Platform, View } from 'react-native';
import { lightTheme, darkTheme } from '../theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

type AppColorScheme = 'light' | 'dark';

type AppThemeContextValue = {
  colorScheme: AppColorScheme;
  toggleColorScheme: () => void;
};

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function useAppTheme() {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used inside ThemeProvider');
  }

  return context;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const {
    colorScheme: nativeWindColorScheme,
    setColorScheme: setNativeWindColorScheme,
  } = useColorScheme();
  const [colorScheme, setColorScheme] = useState<AppColorScheme>(
    nativeWindColorScheme === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    setNativeWindColorScheme(colorScheme);
  }, [colorScheme, setNativeWindColorScheme]);

  const toggleColorScheme = useCallback(() => {
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const contextValue = useMemo(
    () => ({ colorScheme, toggleColorScheme }),
    [colorScheme, toggleColorScheme]
  );

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
    <AppThemeContext.Provider value={contextValue}>
      <View style={themeVars} className={`${colorScheme} flex-1 bg-background`}>
        {children}
      </View>
    </AppThemeContext.Provider>
  );
}
