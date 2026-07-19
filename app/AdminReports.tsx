import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function AdminReports() {
  return (
    <FrontendScreen
      title="Reports"
      subtitle="Frontend reporting placeholders"
      mode="reports"
      items={["Vendor Growth", "Subscription Summary", "Payment Summary", "Category Performance"]}
    />
  );
}
