import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function VendorHelp() {
  return (
    <FrontendScreen
      title="Vendor Help"
      subtitle="Support for your business account"
      mode="help"
      items={["Complete Your Profile", "Manage Services", "Manage Gallery", "Subscription Support"]}
    />
  );
}
