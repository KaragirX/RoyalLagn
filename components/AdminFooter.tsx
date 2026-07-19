import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useColorScheme } from "nativewind";
import { Href, useRouter } from "expo-router";
import {
  BarChart3,
  Users,
  Crown,
  Wallet,
  MoreHorizontal,
} from "lucide-react-native";

type TabKey = "dashboard" | "vendors" | "subscriptions" | "payments" | "more";

type TabItem = {
  key: TabKey;
  label: string;
  icon: React.ElementType;
  route: Href;
};

const tabs: TabItem[] = [
  { key: "dashboard", label: "Dashboard", icon: BarChart3, route: "/admin-dashboard" },
  { key: "vendors", label: "Vendors", icon: Users, route: "/vendors-admin-listing" },
  { key: "subscriptions", label: "Subscriptions", icon: Crown, route: "/subscriptions-admin" },
  { key: "payments", label: "Payments", icon: Wallet, route: "/payments-admin" },
  { key: "more", label: "More", icon: MoreHorizontal, route: "/admin-dash-logout" },
];

interface AdminFooterProps {
  activeTab: TabKey;
}

export default function AdminFooter({ activeTab }: AdminFooterProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const isActive = (tab: TabItem) => tab.key === activeTab;

  return (
    <View
      className="absolute bottom-0 left-0 right-0 flex-row items-center justify-around py-3 px-6 border-t border-border"
      style={{
        backgroundColor: isDark ? "#1C1917" : "#FFFFFF",
        paddingBottom: 24,
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = isActive(tab);

        return (
          <TouchableOpacity
            key={tab.key}
            className="items-center"
            onPress={() => router.push(tab.route)}
          >
            {active ? (
              <View className="w-6 h-6 rounded-lg bg-primary items-center justify-center mb-1">
                <Icon size={14} color="#FFFFFF" />
              </View>
            ) : (
              <Icon size={22} className="text-muted-foreground mb-1" />
            )}
            <Text
              className={`text-xs ${active ? "text-primary" : "text-muted-foreground"}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
