import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function VendorSettings() {
  return (
    <FrontendScreen
      title="Vendor Settings"
      subtitle="Manage business preferences"
      mode="settings"
      items={["Public Profile", "Search Visibility", "Direct Messages", "Marketing Updates"]}
    />
  );
}
