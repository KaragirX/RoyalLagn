import React, { useState } from "react";
import {
View,
Text,
ScrollView,
TouchableOpacity,
Image,
Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Menu, Bell, Eye, Heart, MessageCircle, Star, ChevronRight, Edit3, HeartHandshake, Package, Tag, MessageSquare, Calendar, Settings, Share2, Megaphone, ExternalLink, Headphones, Grid3X3, MessageSquareText, CalendarDays, User, ImageIcon } from "lucide-react-native";

type ProfileItem = {
id: string;
title: string;
subtitle: string;
icon: React.ElementType;
color: string;
progress: number;
};

const profileItems: ProfileItem[] = [
{
id: "business",
title: "Business Information",
subtitle: "Update your business details",
icon: Edit3,
color: "#E91E63",
progress: 80,
},
{
id: "about",
title: "About Your Business",
subtitle: "Tell customers about your journey",
icon: HeartHandshake,
color: "#8B5CF6",
progress: 90,
},
{
id: "services",
title: "Services & Packages",
subtitle: "Add and manage your services",
icon: Package,
color: "#10B981",
progress: 70,
},
{
id: "portfolio",
title: "Portfolio",
subtitle: "Upload your work photos & videos",
icon: ImageIcon,
color: "#3B82F6",
progress: 90,
},
{
id: "pricing",
title: "Pricing & Packages",
subtitle: "Set your pricing and packages",
icon: Tag,
color: "#F59E0B",
progress: 75,
},
{
id: "reviews",
title: "Reviews",
subtitle: "Manage your customer reviews",
icon: MessageSquare,
color: "#EC4899",
progress: 80,
},
{
id: "availability",
title: "Availability",
subtitle: "Manage your availability calendar",
icon: Calendar,
color: "#6366F1",
progress: 60,
},
{
id: "seo",
title: "SEO & Preferences",
subtitle: "Set your preferences and keywords",
icon: Settings,
color: "#14B8A6",
progress: 65,
},
];

type QuickAction = {
id: string;
title: string;
icon: React.ElementType;
color: string;
};

const quickActions: QuickAction[] = [
{ id: "view", title: "View Profile", icon: Eye, color: "#E91E63" },
{ id: "share", title: "Share Profile", icon: Share2, color: "#8B5CF6" },
{ id: "promote", title: "Promote", icon: Megaphone, color: "#F59E0B" },
{ id: "preview", title: "Preview", icon: ExternalLink, color: "#10B981" },
];

type TabItem = {
id: string;
title: string;
icon: React.ElementType;
active?: boolean;
href?: string;
};

const tabs: TabItem[] = [
{ id: "dashboard", title: "Dashboard", icon: Grid3X3, active: true },
{ id: "enquiries", title: "Enquiries", icon: MessageSquareText },
{ id: "bookings", title: "Bookings", icon: CalendarDays },
{ id: "profile", title: "Profile", icon: User, href: "/Vendors_dash_profile" },
];

const stats = [
{
id: "views",
label: "Profile Views",
value: "1,245",
icon: Eye,
color: "#E91E63",
},
{
id: "enquiries",
label: "Enquiries",
value: "320",
icon: Heart,
color: "#E91E63",
},
{
id: "messages",
label: "Messages",
value: "85",
icon: MessageCircle,
color: "#E91E63",
},
{ id: "rating", label: "Rating", value: "4.8", icon: Star, color: "#E91E63" },
];

export default function VendorDashboard() {
const router = useRouter();
const { colorScheme } = useColorScheme();
const isDark = colorScheme === "dark";
const [activeTab, setActiveTab] = useState("dashboard");

const handleTabPress = (tabId: string) => {
setActiveTab(tabId);
if (tabId === "profile") {
router.push("/VendorsProfile");
}
};

return (
<SafeAreaView
className="flex-1 bg-background"
edges={["top", "left", "right"]}
>
{/* Header */}
<View className="flex-row items-center justify-between px-4 py-3">
<TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-muted">
<Menu size={20} className="text-foreground" />
</TouchableOpacity>

<Text className="text-xl font-bold text-primary">
Royal<Text className="text-foreground">Lagn</Text>
</Text>

<TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-muted relative" onPress={() => router.replace("/DashboardCenter" as any)}>
<Bell size={20} className="text-foreground" />
<View className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full items-center justify-center">
<Text className="text-white text-xs font-bold">3</Text>
</View>
</TouchableOpacity>
</View>

<ScrollView
contentContainerStyle={{ paddingBottom: 120 }}
showsVerticalScrollIndicator={false}
>
{/* Welcome Section */}
<View className="mx-4 mt-2 p-4 bg-card rounded-2xl border border-border">
<View className="flex-row items-start justify-between">
<View className="flex-1">
<Text className="text-muted-foreground text-sm mb-1">
Welcome back,
</Text>
<View className="flex-row items-center flex-wrap">
<Text className="text-foreground font-bold text-base mr-2">
Magic Moments Photography
</Text>
<View className="bg-green-100 px-2 py-0.5 rounded-full flex-row items-center">
<Text className="text-green-600 text-xs">✓ Verified</Text>
</View>
</View>
<Text className="text-muted-foreground text-xs mt-1">
Member since Jan 2024
</Text>
</View>
<Image
source={{ uri: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&auto=format&fit=crop&q=60" }}
className="w-16 h-16 rounded-xl"
resizeMode="cover"
/>
</View>
</View>

{/* Profile Overview */}
<View className="mx-4 mt-4">
<View className="flex-row items-center justify-between mb-3">
<Text className="text-foreground font-bold text-base">
Profile Overview
</Text>
<TouchableOpacity className="flex-row items-center">
<Text className="text-primary text-sm font-medium">
View Public Profile
</Text>
<ChevronRight size={16} className="text-primary" />
</TouchableOpacity>
</View>

<View className="flex-row flex-wrap justify-between">
{stats.map((stat) => {
const Icon = stat.icon;
return (
<View
key={stat.id}
className="w-[23%] bg-card rounded-xl p-3 items-center border border-border"
>
<Icon size={20} color={stat.color} />
<Text className="text-foreground font-bold text-lg mt-1">
{stat.value}
</Text>
<Text className="text-muted-foreground text-xs text-center">
{stat.label}
</Text>
</View>
);
})}
</View>
</View>

{/* Complete Your Profile */}
<View className="mx-4 mt-5">
<View className="flex-row items-center justify-between mb-3">
<Text className="text-foreground font-bold text-base">
Complete Your Profile
</Text>
<Text className="text-muted-foreground text-sm">85% Completed</Text>
</View>

{/* Progress Bar */}
<View className="h-2 bg-muted rounded-full overflow-hidden mb-4">
<View
className="h-full bg-primary rounded-full"
style={{ width: "85%" }}
/>
</View>

{/* Profile Items */}
<View className="gap-2">
{profileItems.map((item) => {
const Icon = item.icon;
return (
<TouchableOpacity
key={item.id}
className="flex-row items-center p-3 bg-card rounded-xl border border-border"
>
<View
className="w-10 h-10 rounded-xl items-center justify-center mr-3"
style={{ backgroundColor: `${item.color}15` }}
>
<Icon size={20} color={item.color} />
</View>

<View className="flex-1">
<Text className="text-foreground font-semibold text-sm">
{item.title}
</Text>
<Text className="text-muted-foreground text-xs">
{item.subtitle}
</Text>
</View>

<View className="flex-row items-center gap-2">
<View className="px-2 py-1 rounded-full bg-muted">
<Text
className="text-xs font-medium"
style={{ color: item.color }}
>
{item.progress}%
</Text>
</View>
<ChevronRight size={16} className="text-muted-foreground" />
</View>
</TouchableOpacity>
);
})}
</View>
</View>

{/* Quick Actions */}
<View className="mx-4 mt-5">
<Text className="text-foreground font-bold text-base mb-3">
Quick Actions
</Text>

<View className="flex-row justify-between">
{quickActions.map((action) => {
const Icon = action.icon;
return (
<TouchableOpacity key={action.id} className="items-center">
<View
className="w-14 h-14 rounded-2xl items-center justify-center mb-2"
style={{ backgroundColor: `${action.color}15` }}
>
<Icon size={22} color={action.color} />
</View>
<Text className="text-foreground text-xs">
{action.title}
</Text>
</TouchableOpacity>
);
})}
</View>
</View>

{/* Need Help */}
<View className="mx-4 mt-5 p-4 bg-card rounded-2xl border border-border">
<View className="flex-row items-center justify-between">
<View className="flex-1">
<Text className="text-foreground font-bold text-base mb-1">
Need Help?
</Text>
<Text className="text-muted-foreground text-xs mb-3">
We're here to help you grow your business
</Text>
<TouchableOpacity className="bg-primary px-4 py-2 rounded-full self-start">
<Text className="text-white text-xs font-medium">
Contact Support
</Text>
</TouchableOpacity>
</View>
<View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center ml-3">
<Headphones size={28} color="#E91E63" />
</View>
</View>
</View>
</ScrollView>

{/* Bottom Tab Bar */}
<View
className="absolute bottom-0 left-0 right-0 bg-card border-t border-border flex-row justify-around py-3 pb-6"
style={{
shadowColor: "#000",
shadowOffset: { width: 0, height: -2 },
shadowOpacity: 0.05,
shadowRadius: 8,
elevation: 10,
}}
>
{tabs.map((tab) => {
const Icon = tab.icon;
const isActive = tab.id === activeTab;
return (
<TouchableOpacity
key={tab.id}
className="items-center"
onPress={() => handleTabPress(tab.id)}
>
<Icon
size={22}
color={isActive ? "#E91E63" : isDark ? "#78716C" : "#A8A29E"}
/>
<Text
className="text-xs mt-1"
style={{
color: isActive ? "#E91E63" : isDark ? "#78716C" : "#A8A29E",
fontWeight: isActive ? "600" : "400",
}}
>
{tab.title}
</Text>
</TouchableOpacity>
);
})}
</View>
</SafeAreaView>
);
}