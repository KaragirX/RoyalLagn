import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function Help() {
  return (
    <FrontendScreen
      title="Help Center"
      subtitle="Find answers and contact support"
      mode="help"
      items={["Using RoyalLagn", "Managing Favorites", "Contacting Vendors", "Account Support"]}
    />
  );
}
