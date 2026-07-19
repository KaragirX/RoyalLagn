import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function Settings() {
  return (
    <FrontendScreen
      title="Settings"
      subtitle="Manage your app preferences"
      mode="settings"
      items={["Push Notifications", "Email Updates", "Profile Visibility", "Personalized Results"]}
    />
  );
}
