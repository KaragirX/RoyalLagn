import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function AdminHelp() {
  return (
    <FrontendScreen
      title="Admin Help"
      subtitle="Platform administration support"
      mode="help"
      items={["Vendor Management", "User Management", "Categories", "Reports"]}
    />
  );
}
