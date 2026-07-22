import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { useFocusEffect, useRouter } from "expo-router";
import {
  Menu,
  Bell,
  ChevronDown,
  Users,
  Crown,
  Wallet,
  MessageCircle,
  Star,
  BarChart3,
  UserPlus,
  ChevronRight,
  ClipboardList,
} from "lucide-react-native";

import AdminFooter from "@/components/AdminFooter";
import { supabase } from "@/services/supabase";

type StatCard = {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ElementType;
  iconBg: string;
};

type QuickAction = {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
};

type Subscription = {
  id: string;
  name: string;
  avatar: string;
  plan: string;
  status: "Active" | "Pending" | "Expired";
  time: string;
};

type Enquiry = {
  id: string;
  name: string;
  avatar: string;
  query: string;
  time: string;
  isNew: boolean;
};

const statsData: StatCard[] = [
  {
    id: "vendors",
    title: "Total Vendors",
    value: "1,248",
    change: "12.5%",
    changeType: "positive",
    icon: Users,
    iconBg: "#FCE7F3",
  },
  {
    id: "subscriptions",
    title: "Active Subscriptions",
    value: "986",
    change: "10.3%",
    changeType: "positive",
    icon: Crown,
    iconBg: "#E0E7FF",
  },
  {
    id: "revenue",
    title: "Revenue",
    value: "₹2,84,950",
    change: "18.6%",
    changeType: "positive",
    icon: Wallet,
    iconBg: "#FEF3C7",
  },
  {
    id: "enquiries",
    title: "Enquiries",
    value: "2,135",
    change: "9.8%",
    changeType: "positive",
    icon: MessageCircle,
    iconBg: "#D1FAE5",
  },
];

const quickActions: QuickAction[] = [
  { id: "vendor-applications", title: "Vendor Applications", icon: ClipboardList, color: "#EC4899" },
  { id: "add-vendor", title: "Add Vendor", icon: UserPlus, color: "#E91E63" },
  {
    id: "subscriptions",
    title: "Subscriptions",
    icon: Crown,
    color: "#8B5CF6",
  },
  { id: "payments", title: "Payments", icon: Wallet, color: "#F59E0B" },
  {
    id: "enquiries",
    title: "Enquiries",
    icon: MessageCircle,
    color: "#10B981",
  },
  { id: "reviews", title: "Reviews", icon: Star, color: "#F97316" },
  { id: "reports", title: "Reports", icon: BarChart3, color: "#3B82F6" },
];

const recentSubscriptions: Subscription[] = [
  {
    id: "1",
    name: "Magic Moments Photography",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    plan: "Premium Plan + 1 Month Free",
    status: "Active",
    time: "2 mins ago",
  },
  {
    id: "2",
    name: "Dream Decorators",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    plan: "Basic Plan + 1 Month Free",
    status: "Active",
    time: "28 mins ago",
  },
  {
    id: "3",
    name: "Royal Caterers",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    plan: "Standard Plan",
    status: "Active",
    time: "1 hour ago",
  },
  {
    id: "4",
    name: "Perfect Clicks",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    plan: "Premium Plan",
    status: "Active",
    time: "2 hours ago",
  },
];

const recentEnquiries: Enquiry[] = [
  {
    id: "1",
    name: "Neha Sharma",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    query: "Looking for Photographers",
    time: "5 mins ago",
    isNew: true,
  },
  {
    id: "2",
    name: "Rahul Verma",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    query: "Looking for Wedding Venues",
    time: "15 mins ago",
    isNew: true,
  },
  {
    id: "3",
    name: "Pooja Singh",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    query: "Looking for Decorators",
    time: "25 mins ago",
    isNew: true,
  },
];

const screenWidth = Dimensions.get("window").width - 48;

export default function AdminDashboard() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const [notificationCount, setNotificationCount] = useState(0);
  useFocusEffect(useCallback(() => {
    supabase.from("admin_notifications").select("id", { count: "exact", head: true }).eq("is_read", false)
      .then(({ count }) => setNotificationCount(count ?? 0));
  }, []));
  const showPlaceholder = (title: string) =>
    Alert.alert(title, `${title} is available as a local frontend placeholder.`);
  const handleQuickAction = (id: string) => {
    if (id === "vendor-applications") return router.push("/VendorApplications");
    if (id === "add-vendor") return router.push("/vendors-admin-listing");
    if (id === "subscriptions") return router.push("/subscriptions-admin");
    if (id === "payments") return router.push("/payments-admin");
    if (id === "enquiries") return router.push("/AdminUsers");
    if (id === "reviews") return router.push("/AdminCategories");
    router.push("/AdminReports");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top", "left", "right"]}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity className="p-2 -ml-2" onPress={() => router.push("/admin-dash-logout")}>
            <Menu size={24} className="text-foreground" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-primary">RoyalLagn</Text>
          <TouchableOpacity className="p-2 -mr-2 relative" onPress={() => router.push("/VendorApplications")}>
            <Bell size={24} className="text-foreground" />
            {notificationCount > 0 ? <View className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-destructive rounded-full items-center justify-center"><Text className="text-white text-[10px] font-bold">{notificationCount > 99 ? "99+" : notificationCount}</Text></View> : null}
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View className="px-6 mb-6">
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-foreground">
                Welcome back,{"\n"}Admin 👋
              </Text>
              <Text className="text-muted-foreground text-sm mt-1">
                {"Here's what's happening on"}{"\n"}your platform today.
              </Text>
            </View>
            <TouchableOpacity className="flex-row items-center bg-card border border-border rounded-full px-3 py-1.5" onPress={() => showPlaceholder("Dashboard Date Range")}>
              <Text className="text-foreground text-sm mr-1">This Month</Text>
              <ChevronDown size={14} className="text-foreground" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="px-6 mb-6">
          <View className="flex-row flex-wrap gap-4">
            {statsData.map((stat) => {
              const Icon = stat.icon;
              return (
                <View
                  key={stat.id}
                  className="flex-1 min-w-[45%] bg-card rounded-2xl p-4 border border-border"
                >
                  <View
                    className="w-10 h-10 rounded-xl items-center justify-center mb-3"
                    style={{ backgroundColor: stat.iconBg }}
                  >
                    <Icon size={20} color={isDark ? "#E91E63" : "#E91E63"} />
                  </View>
                  <Text className="text-muted-foreground text-xs mb-1">
                    {stat.title}
                  </Text>
                  <Text className="text-foreground text-xl font-bold mb-1">
                    {stat.value}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-emerald-500 text-xs font-medium">
                      ↑ {stat.change}
                    </Text>
                    <Text className="text-muted-foreground text-xs ml-1">
                      vs last 30 days
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Revenue Overview Chart */}
        <View className="px-6 mb-6">
          <View className="bg-card rounded-2xl p-4 border border-border">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-foreground font-semibold text-base">
                Revenue Overview
              </Text>
              <TouchableOpacity className="flex-row items-center bg-muted rounded-full px-3 py-1" onPress={() => showPlaceholder("Revenue Date Range")}>
                <Text className="text-foreground text-xs mr-1">This Month</Text>
                <ChevronDown size={12} className="text-foreground" />
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-foreground text-2xl font-bold">
                ₹2,84,950
              </Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-emerald-500 text-sm font-medium">
                  ↑ 18.6%
                </Text>
                <Text className="text-muted-foreground text-sm ml-1">
                  vs last month
                </Text>
              </View>
            </View>

            {/* Chart Tooltip */}
            <View className="absolute top-24 right-8 bg-foreground rounded-lg px-2 py-1 z-10">
              <Text className="text-background text-xs font-medium">
                ₹72,680
              </Text>
              <Text className="text-background/70 text-[10px]">Jun 10</Text>
            </View>

            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RGF0YSUyMGFuYWx5dGljc3xlbnwwfHwwfHx8MA%3D%3D",
              }}
              className="w-full h-44 rounded-lg"
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-6">
          <Text className="text-foreground font-semibold text-base mb-4">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={action.id}
                  className="items-center"
                  style={{ width: (screenWidth - 24) / 3 }}
                  onPress={() => handleQuickAction(action.id)}
                >
                  <View
                    className="w-14 h-14 rounded-2xl items-center justify-center mb-2"
                    style={{ backgroundColor: `${action.color}15` }}
                  >
                    <Icon size={24} color={action.color} />
                  </View>
                  <Text className="text-foreground text-xs text-center">
                    {action.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recent Subscriptions */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-foreground font-semibold text-base">
              Recent Subscriptions
            </Text>
            <TouchableOpacity className="flex-row items-center" onPress={() => router.push("/subscriptions-admin")}>
              <Text className="text-primary text-sm mr-1">View All</Text>
              <ChevronRight size={16} className="text-primary" />
            </TouchableOpacity>
          </View>

          <View className="bg-card rounded-2xl border border-border overflow-hidden">
            {recentSubscriptions.map((subscription, index) => (
              <View
                key={subscription.id}
                className={`flex-row items-center p-4 ${
                  index !== recentSubscriptions.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <Image
                  source={{ uri: subscription.avatar }}
                  className="w-12 h-12 rounded-full"
                />
                <View className="flex-1 ml-3">
                  <Text className="text-foreground font-medium text-sm">
                    {subscription.name}
                  </Text>
                  <Text className="text-muted-foreground text-xs">
                    {subscription.plan}
                  </Text>
                </View>
                <View className="items-end">
                  <View className="bg-emerald-100 px-2 py-1 rounded-full mb-1">
                    <Text className="text-emerald-700 text-xs font-medium">
                      {subscription.status}
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-xs">
                    {subscription.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Enquiries */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-foreground font-semibold text-base">
              Recent Enquiries
            </Text>
            <TouchableOpacity className="flex-row items-center" onPress={() => router.push("/AdminUsers")}>
              <Text className="text-primary text-sm mr-1">View All</Text>
              <ChevronRight size={16} className="text-primary" />
            </TouchableOpacity>
          </View>

          <View className="bg-card rounded-2xl border border-border overflow-hidden">
            {recentEnquiries.map((enquiry, index) => (
              <View
                key={enquiry.id}
                className={`flex-row items-center p-4 ${
                  index !== recentEnquiries.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <Image
                  source={{ uri: enquiry.avatar }}
                  className="w-12 h-12 rounded-full"
                />
                <View className="flex-1 ml-3">
                  <Text className="text-foreground font-medium text-sm">
                    {enquiry.name}
                  </Text>
                  <Text className="text-muted-foreground text-xs">
                    {enquiry.query}
                  </Text>
                </View>
                <View className="items-end">
                  {enquiry.isNew && (
                    <View className="w-2 h-2 bg-destructive rounded-full mb-1" />
                  )}
                  <Text className="text-muted-foreground text-xs">
                    {enquiry.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Admin Footer */}
      <AdminFooter activeTab="dashboard" />
    </SafeAreaView>
  );
}
