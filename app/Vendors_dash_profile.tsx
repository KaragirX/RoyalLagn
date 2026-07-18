import React from "react";
import {
View,
Text,
ScrollView,
TouchableOpacity,
Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import {
ArrowLeft,
Edit3,
Crown,
MapPin,
User,
Mail,
Phone,
MapPinned,
Lock,
Briefcase,
Layers,
Award,
Users,
Languages,
HelpCircle,
Headphones,
Shield,
FileText,
LogOut,
ChevronRight,
CheckCircle2,
} from "lucide-react-native";

export default function VendorsDashProfile() {
const router = useRouter();
const { colorScheme } = useColorScheme();
const isDark = colorScheme === "dark";

const accountInfo = [
{
id: "name",
icon: User,
label: "Full Name",
value: "Rohit Sharma",
},
{
id: "email",
icon: Mail,
label: "Email Address",
value: "rohit.magicmoments@gmail.com",
},
{
id: "phone",
icon: Phone,
label: "Mobile Number",
value: "+91 98765 43210",
},
{
id: "address",
icon: MapPinned,
label: "Business Address",
value: "Lonavala, Pune, Maharashtra, 410401",
},
{
id: "password",
icon: Lock,
label: "Password",
value: "••••••••",
},
];

const businessInfo = [
{
id: "businessName",
icon: Briefcase,
label: "Business Name",
value: "Magic Moments Photography",
},
{
id: "category",
icon: Layers,
label: "Business Category",
value: "Photographer",
},
{
id: "experience",
icon: Award,
label: "Years of Experience",
value: "8+ Years",
},
{
id: "team",
icon: Users,
label: "Team Size",
value: "5-10 Members",
},
{
id: "languages",
icon: Languages,
label: "Languages Known",
value: "English, Hindi, Marathi",
},
];

const supportSettings = [
{
id: "help",
icon: HelpCircle,
label: "Help Center",
},
{
id: "support",
icon: Headphones,
label: "Contact Support",
},
{
id: "privacy",
icon: Shield,
label: "Privacy Policy",
},
{
id: "terms",
icon: FileText,
label: "Terms & Conditions",
},
{
id: "logout",
icon: LogOut,
label: "Logout",
isLogout: true,
},
];

return (
<SafeAreaView
className="flex-1 bg-background"
edges={["top", "left", "right"]}
>
{/* Header */}
<View className="flex-row items-center justify-between px-4 py-3">
<TouchableOpacity
className="w-10 h-10 items-center justify-center rounded-full bg-muted"
onPress={() => router.back()}
>
<ArrowLeft size={20} className="text-foreground" />
</TouchableOpacity>

<Text className="text-xl font-bold text-foreground">Profile</Text>

<TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-muted">
<Edit3 size={20} className="text-foreground" />
</TouchableOpacity>
</View>

<ScrollView
contentContainerStyle={{ paddingBottom: 140 }}
showsVerticalScrollIndicator={false}
>
{/* Profile Header Section */}
<View className="items-center px-4 pt-2 pb-6">
{/* Avatar */}
<View className="relative">
<Image
source={{
uri: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&auto=format&fit=crop&q=60",
}}
className="w-24 h-24 rounded-full border-4 border-primary/20"
resizeMode="cover"
/>
<View className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full items-center justify-center border-2 border-background">
<CheckCircle2 size={14} color="#FFFFFF" />
</View>
</View>

{/* Business Name */}
<View className="flex-row items-center mt-3">
<Text className="text-xl font-bold text-foreground text-center">
Magic Moments Photography
</Text>
<View className="ml-2 bg-green-100 px-2 py-0.5 rounded-full flex-row items-center">
<Text className="text-green-600 text-xs font-medium">
Verified
</Text>
</View>
</View>

{/* Category */}
<Text className="text-primary font-medium text-sm mt-1">
Photographer
</Text>

{/* Location */}
<View className="flex-row items-center mt-1">
<MapPin size={14} className="text-muted-foreground" />
<Text className="text-muted-foreground text-sm ml-1">
Lonavala, Pune
</Text>
</View>
</View>

{/* Subscription Plan Card */}
<View className="mx-4 mb-6">
<View className="bg-card rounded-2xl p-4 border border-border flex-row items-center justify-between">
<View className="flex-row items-center flex-1">
<View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
<Crown size={24} color="#E91E63" />
</View>
<View className="ml-3 flex-1">
<Text className="text-muted-foreground text-xs">
Subscription Plan
</Text>
<Text className="text-foreground font-bold text-base">
Premium Plan
</Text>
<Text className="text-muted-foreground text-xs">
Valid till 15 Jun 2025
</Text>
</View>
</View>
<TouchableOpacity className="bg-primary px-4 py-2 rounded-full">
<Text className="text-white text-xs font-medium">View Plan</Text>
</TouchableOpacity>
</View>
</View>

{/* Account Information */}
<View className="mx-4 mb-6">
<Text className="text-foreground font-bold text-base mb-3">
Account Information
</Text>
<View className="bg-card rounded-2xl border border-border overflow-hidden">
{accountInfo.map((item, index) => {
const Icon = item.icon;
return (
<TouchableOpacity
key={item.id}
className={`flex-row items-center p-4 ${
index !== accountInfo.length - 1 ? "border-b border-border" : ""
}`}
>
<View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
<Icon size={18} color="#E91E63" />
</View>
<View className="flex-1 ml-3">
<Text className="text-muted-foreground text-xs">
{item.label}
</Text>
<Text className="text-foreground text-sm font-medium">
{item.value}
</Text>
</View>
<ChevronRight size={18} className="text-muted-foreground" />
</TouchableOpacity>
);
})}
</View>
</View>

{/* Business Information */}
<View className="mx-4 mb-6">
<Text className="text-foreground font-bold text-base mb-3">
Business Information
</Text>
<View className="bg-card rounded-2xl border border-border overflow-hidden">
{businessInfo.map((item, index) => {
const Icon = item.icon;
return (
<TouchableOpacity
key={item.id}
className={`flex-row items-center p-4 ${
index !== businessInfo.length - 1 ? "border-b border-border" : ""
}`}
>
<View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
<Icon size={18} color="#E91E63" />
</View>
<View className="flex-1 ml-3">
<Text className="text-muted-foreground text-xs">
{item.label}
</Text>
<Text className="text-foreground text-sm font-medium">
{item.value}
</Text>
</View>
<ChevronRight size={18} className="text-muted-foreground" />
</TouchableOpacity>
);
})}
</View>
</View>

{/* Support & Settings */}
<View className="mx-4 mb-6">
<Text className="text-foreground font-bold text-base mb-3">
Support & Settings
</Text>
<View className="bg-card rounded-2xl border border-border overflow-hidden">
{supportSettings.map((item, index) => {
const Icon = item.icon;
return (
<TouchableOpacity
key={item.id}
className={`flex-row items-center p-4 ${
index !== supportSettings.length - 1 ? "border-b border-border" : ""
}`}
onPress={() => {
if (item.id === "logout") {
router.replace("/DashboardCenter" as any);
}
}}
>
<View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
<Icon size={18} color={item.isLogout ? "#E91E63" : "#E91E63"} />
</View>
<View className="flex-1 ml-3">
<Text
className={`text-sm font-medium ${
item.isLogout ? "text-primary" : "text-foreground"
}`}
>
{item.label}
</Text>
</View>
<ChevronRight size={18} className="text-muted-foreground" />
</TouchableOpacity>
);
})}
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
<TouchableOpacity
className="items-center"
onPress={() => router.push("/vendor-dashboard")}
>
<View className="w-6 h-6 items-center justify-center">
<View className="w-5 h-5 border-2 border-muted-foreground rounded-md" />
</View>
<Text className="text-xs mt-1 text-muted-foreground">Dashboard</Text>
</TouchableOpacity>

<TouchableOpacity className="items-center">
<View className="w-6 h-6 items-center justify-center">
<View className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
</View>
<Text className="text-xs mt-1 text-muted-foreground">Enquiries</Text>
</TouchableOpacity>

<TouchableOpacity className="items-center">
<View className="w-6 h-6 items-center justify-center">
<View className="w-5 h-5 border-2 border-muted-foreground rounded-md" />
</View>
<Text className="text-xs mt-1 text-muted-foreground">Bookings</Text>
</TouchableOpacity>

<TouchableOpacity className="items-center">
<View className="w-6 h-6 items-center justify-center">
<User size={22} color="#E91E63" />
</View>
<Text className="text-xs mt-1 text-primary font-medium">Profile</Text>
</TouchableOpacity>
</View>
</SafeAreaView>
);
}