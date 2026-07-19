import React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { ThemeToggle } from "@/components/ThemeToggle";
import {
User,
MapPin,
Phone,
Mail,
Bell,
HelpCircle,
Shield,
LogOut,
ChevronRight,
Edit,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";

type MenuItemProps = {
icon: React.ElementType;
label: string;
onPress?: () => void;
};

const MenuItem = ({ icon: Icon, label, onPress }: MenuItemProps) => (
<Pressable
className="flex-row items-center justify-between p-4 border-b border-border last:border-b-0 active:bg-muted/50"
onPress={onPress}
>
<View className="flex-row items-center">
<Icon size={20} className="text-muted-foreground mr-3" />
<Text className="text-foreground text-base">{label}</Text>
</View>
<ChevronRight size={18} className="text-muted-foreground" />
</Pressable>
);

const user = {
name: "Priya Sharma",
email: "priya.sharma@email.com",
phone: "+91 98765 43210",
location: "Pune, Maharashtra",
avatar:
"https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?w=400&auto=format&fit=crop&q=60",
};

export default function ProfileScreen() {
const router = useRouter();
const { colorScheme } = useColorScheme();
const isDark = colorScheme === "dark";
return (
<SafeAreaView
className="flex-1 bg-background"
edges={["top", "left", "right"]}
>
{/* Header */}
<View className="flex-row items-center justify-between px-6 py-4">
<Text className="text-2xl font-bold text-foreground">Profile</Text>
<ThemeToggle />
</View>

<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120, gap: 24 }}
>
{/* Profile Card */}
<View className="bg-card rounded-2xl p-6 items-center shadow-sm">
<View className="relative mb-4">
<Image
source={{ uri: user.avatar }}
className="w-24 h-24 rounded-full"
style={{ borderWidth: 3, borderColor: isDark ? '#333333' : '#FBCFE8' }}
/>
<Pressable
className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full items-center justify-center border-2 border-card"
onPress={() => router.push("/EditProfile")}
>
<Edit size={14} className="text-white" />
</Pressable>
</View>

<Text className="text-xl font-bold text-foreground mb-1">
{user.name}
</Text>
<Text className="text-muted-foreground text-sm mb-4">
{user.email}
</Text>

<View className="flex-row w-full gap-3">
<Pressable className="flex-1 bg-primary py-2.5 rounded-full items-center justify-center" onPress={() => router.push("/EditProfile")}>
<Text className="text-primary-foreground font-semibold text-sm">
Edit Profile
</Text>
</Pressable>
</View>
</View>

{/* Contact Info */}
<View className="bg-card rounded-2xl p-4 gap-4">
<View className="flex-row items-center">
<View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
<Phone size={18} className="text-primary" />
</View>
<View>
<Text className="text-xs text-muted-foreground">Phone</Text>
<Text className="text-foreground font-medium">{user.phone}</Text>
</View>
</View>

<View className="flex-row items-center">
<View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
<MapPin size={18} className="text-primary" />
</View>
<View>
<Text className="text-xs text-muted-foreground">Location</Text>
<Text className="text-foreground font-medium">{user.location}</Text>
</View>
</View>
</View>

{/* Account Settings */}
<View className="bg-card rounded-2xl overflow-hidden shadow-sm">
<Text className="text-xs font-semibold text-muted-foreground px-4 pt-4 pb-2 uppercase tracking-wider">
Account
</Text>
<MenuItem icon={User} label="Personal Information" onPress={() => router.push("/EditProfile")} />
<MenuItem icon={Shield} label="Privacy & Security" onPress={() => router.push("/PrivacyPolicy")} />
<MenuItem icon={Bell} label="Notifications" onPress={() => router.push("/Settings")} />
</View>

{/* Support & About */}
<View className="bg-card rounded-2xl overflow-hidden shadow-sm">
<Text className="text-xs font-semibold text-muted-foreground px-4 pt-4 pb-2 uppercase tracking-wider">
Support
</Text>
<MenuItem icon={HelpCircle} label="Help Center" onPress={() => router.push("/Help")} />
<MenuItem icon={Shield} label="Terms & Conditions" onPress={() => router.push("/Terms")} />
<MenuItem icon={Mail} label="Contact Us" onPress={() => router.push("/About")} />
</View>

{/* Logout Button */}
<Pressable 
className="bg-destructive/10 rounded-2xl p-4 flex-row items-center justify-center mt-2"
onPress={() => {
router.replace("/DashboardCenter");
}}
>
<LogOut size={20} className="text-destructive mr-2" />
<Text className="text-destructive font-semibold text-base">
Log Out
</Text>
</Pressable>

{/* App Version */}
<Text className="text-center text-muted-foreground text-xs pb-4">
Version 1.0.0
</Text>
</ScrollView>
</SafeAreaView>
);
}
