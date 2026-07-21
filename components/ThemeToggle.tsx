import { Pressable } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useAppTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useAppTheme();

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel="Dark mode"
      accessibilityState={{ checked: colorScheme === 'dark' }}
      className="w-11 h-11 rounded-full items-center justify-center hover:bg-muted active:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-colors duration-200"
      onPress={toggleColorScheme}
    >
      {colorScheme === 'dark' ? (
        <Sun className="text-foreground" size={24} />
      ) : (
        <Moon className="text-foreground" size={24} />
      )}
    </Pressable>
  );
}
