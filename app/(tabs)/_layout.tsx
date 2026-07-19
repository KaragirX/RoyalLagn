import { Tabs } from 'expo-router';
import { Home, Grid3X3, Heart, User } from 'lucide-react-native';
import { cssInterop, useColorScheme } from 'nativewind';

cssInterop(Home,     { className: { target: 'style', nativeStyleToProp: { color: true } } });
cssInterop(Grid3X3,  { className: { target: 'style', nativeStyleToProp: { color: true } } });
cssInterop(Heart,    { className: { target: 'style', nativeStyleToProp: { color: true } } });
cssInterop(User,     { className: { target: 'style', nativeStyleToProp: { color: true } } });

export default function TabsLayout() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: isDark ? '#141414' : '#FFF1FC',
                    borderTopColor: isDark ? '#333333' : '#FBCFE8',
                    height: 65,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: isDark ? '#EC4899' : '#E91E63',
                tabBarInactiveTintColor: isDark ? '#AAA0A5' : '#787178',
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '500',
                    marginTop: 2,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <Home
                            className={focused ? 'text-primary' : 'text-muted-foreground'}
                            size={22}
                            strokeWidth={focused ? 2.5 : 2}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Categories"
                options={{
                    title: 'Category',
                    tabBarIcon: ({ focused }) => (
                        <Grid3X3
                            className={focused ? 'text-primary' : 'text-muted-foreground'}
                            size={22}
                            strokeWidth={focused ? 2.5 : 2}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({ focused }) => (
                        <Heart
                            className={focused ? 'text-primary' : 'text-muted-foreground'}
                            size={22}
                            strokeWidth={focused ? 2.5 : 2}
                            fill={focused ? 'currentColor' : 'none'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <User
                            className={focused ? 'text-primary' : 'text-muted-foreground'}
                            size={22}
                            strokeWidth={focused ? 2.5 : 2}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
