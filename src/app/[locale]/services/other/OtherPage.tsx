"use client";

import { Settings } from "lucide-react";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";

export default function OtherPage() {
  return (
    <ServiceDetailPage
      serviceKey="other"
      icon={Settings}
      image="/service-icon/other.png"
      color="bg-gray-500"
    />
  );
}
