import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function AdminUsers() {
  return (
    <FrontendScreen
      title="User Management"
      subtitle="Manage frontend user records"
      mode="list"
      items={["Priya Sharma", "Aarav Mehta", "Neha Patil", "Rahul Verma"]}
    />
  );
}
