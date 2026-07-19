import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function PrivacyPolicy() {
  return (
    <FrontendScreen
      title="Privacy Policy"
      subtitle="How RoyalLagn handles your information"
      mode="info"
      content={[
        "RoyalLagn currently stores frontend changes only in temporary local component state. No account information is sent to a backend.",
        "When backend services are introduced, this policy should be reviewed and expanded to describe data collection, retention, security and user rights.",
      ]}
    />
  );
}
