import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function VendorNotifications() {
  return (
    <FrontendScreen
      title="Notifications"
      subtitle="Manage vendor notification preferences"
      mode="settings"
      items={["New Enquiries", "Profile Activity", "Reviews", "Subscription Updates"]}
    />
  );
}
