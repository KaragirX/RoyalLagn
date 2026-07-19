import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function About() {
  return (
    <FrontendScreen
      title="About RoyalLagn"
      subtitle="Your wedding vendor marketplace"
      mode="info"
      content={[
        "RoyalLagn helps couples discover trusted wedding professionals across categories including venues, photography, catering, decor and styling.",
        "This frontend experience currently uses local sample content. Live accounts, vendor communication and other connected services can be added during backend integration.",
      ]}
    />
  );
}
