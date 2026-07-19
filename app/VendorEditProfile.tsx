import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function VendorEditProfile() {
  return (
    <FrontendScreen
      title="Edit Vendor Profile"
      subtitle="Update your business information"
      mode="form"
      fields={[
        { key: "business", label: "Business Name", value: "Magic Moments Photography" },
        { key: "owner", label: "Owner Name", value: "Rohit Sharma" },
        { key: "email", label: "Email Address", value: "rohit.magicmoments@gmail.com" },
        { key: "phone", label: "Mobile Number", value: "+91 98765 43210" },
        { key: "location", label: "Business Address", value: "Lonavala, Pune" },
      ]}
    />
  );
}
