import React from "react";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import FrontendScreen from "@/components/FrontendScreen";

export default function AdminSettings() {
  const router = useRouter();
  return (
    <FrontendScreen
      title="Admin Settings"
      subtitle="Manage platform frontend options"
      mode="settings"
      items={["User Management", "Category Management", "Admin Alerts", "Help Center"]}
      onItemPress={(item) => {
        if (item === "User Management") router.push("/AdminUsers");
        else if (item === "Category Management") router.push("/AdminCategories");
        else if (item === "Help Center") router.push("/AdminHelp");
        else Alert.alert("Admin Alerts", "Admin alerts were updated locally.");
      }}
    />
  );
}
