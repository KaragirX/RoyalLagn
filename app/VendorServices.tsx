import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function VendorServices() {
  return (
    <FrontendScreen
      title="Services"
      subtitle="Manage services and pricing"
      mode="list"
      items={["Candid Photography", "Traditional Photography", "Cinematic Video", "Pre-Wedding Shoot"]}
    />
  );
}
