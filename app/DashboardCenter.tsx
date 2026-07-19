import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { User, Building2, Shield, ArrowRight } from "lucide-react-native";

type LoginOption = {
id: string;
title: string;
description: string;
icon: React.ElementType;
color: string;
route: string;
};

const loginOptions: LoginOption[] = [
{
id: "public",
title: "Public Site",
description: "Browse vendors, explore categories, and plan your wedding",
icon: User,
color: "#E91E63",
route: "/(tabs)",
},
{
id: "vendor",
title: "Vendor Dashboard",
description: "Manage your business, profile, and services",
icon: Building2,
color: "#F59E0B",
route: "/vendor-dashboard",
},
{
id: "admin",
title: "Admin Dashboard",
description: "Platform administration and analytics",
icon: Shield,
color: "#3B82F6",
route: "/admin-dashboard",
},
];

export default function DashboardCenter() {
const router = useRouter();
const { colorScheme } = useColorScheme();
const isDark = colorScheme === "dark";

return (
<SafeAreaView
className="flex-1 bg-background"
edges={["top", "left", "right"]}
>
<View className="flex-1 px-6 justify-center">
{/* Logo/Title */}
<View className="items-center mb-12">
<Text className="text-primary font-bold text-4xl mb-2">
Royal<Text className="text-foreground">Lagn</Text>
</Text>
<Text className="text-muted-foreground text-base">
Choose your login type
</Text>
</View>

{/* Login Options */}
<View className="gap-5">
{loginOptions.map((option) => {
const Icon = option.icon;
return (
<Pressable
key={option.id}
className={`rounded-2xl p-5 flex-row items-center shadow-sm ${
isDark ? "bg-card" : "bg-white"
}`}
style={{
shadowColor: option.color,
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 8,
elevation: 3,
}}
onPress={() => router.replace(option.route)}
>
{/* Icon Container */}
<View
className="w-16 h-16 rounded-2xl items-center justify-center mr-4"
style={{ backgroundColor: `${option.color}15` }}
>
<Icon size={28} color={option.color} strokeWidth={2} />
</View>

{/* Text Content */}
<View className="flex-1">
<Text className="text-foreground font-bold text-lg mb-1">
{option.title}
</Text>
<Text
className="text-muted-foreground text-sm leading-tight"
numberOfLines={2}
>
{option.description}
</Text>
</View>

{/* Arrow Icon */}
<ArrowRight
size={20}
className="text-muted-foreground ml-2"
strokeWidth={2}
/>
</Pressable>
);
})}
</View>

{/* Footer Text */}
<View className="items-center mt-12">
<Text className="text-muted-foreground text-xs">
Select an option to continue
</Text>
</View>
</View>
</SafeAreaView>
);
}