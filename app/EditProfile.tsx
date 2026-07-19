import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function EditProfile() {
  return (
    <FrontendScreen
      title="Edit Profile"
      subtitle="Update your personal information"
      mode="form"
      fields={[
        { key: "name", label: "Full Name", value: "Priya Sharma" },
        { key: "email", label: "Email Address", value: "priya.sharma@email.com" },
        { key: "phone", label: "Phone Number", value: "+91 98765 43210" },
        { key: "location", label: "Location", value: "Pune, Maharashtra" },
      ]}
    />
  );
}
