import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function Terms() {
  return (
    <FrontendScreen
      title="Terms & Conditions"
      subtitle="Terms for using RoyalLagn"
      mode="info"
      content={[
        "The current RoyalLagn application is a frontend demonstration. Vendor, price and profile information is sample content.",
        "Users should independently confirm vendor availability, services and commercial terms before making external arrangements.",
      ]}
    />
  );
}
