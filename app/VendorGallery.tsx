import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function VendorGallery() {
  return (
    <FrontendScreen
      title="Gallery"
      subtitle="Manage your portfolio media"
      mode="gallery"
      items={["Wedding Story", "Couple Portraits", "Ceremony", "Reception"]}
    />
  );
}
