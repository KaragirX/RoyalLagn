import React from "react";
import FrontendScreen from "@/components/FrontendScreen";

export default function AdminCategories() {
  return (
    <FrontendScreen
      title="Category Management"
      subtitle="Manage marketplace categories"
      mode="list"
      items={["Venues", "Photographers", "Caterers", "Decorators", "Makeup Artists", "DJs"]}
    />
  );
}
