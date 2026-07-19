import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function VendorSubscription() {
  return (
    <FrontendScreen
      title="Subscription"
      subtitle="View your current frontend plan"
      mode="info"
      content={[
        "Premium Plan — Active",
        "Profile visibility, portfolio tools and enquiry management are enabled in this frontend preview.",
        "Plan changes and payments will remain unavailable until backend integration.",
      ]}
    />
  );
}
