"use client";

import { Package } from "lucide-react";
import SubServiceDetailPage from "@/components/pages/SubServiceDetailPage";

export default function StandardDeliveryPage() {
  return (
    <SubServiceDetailPage
      serviceKey="standardDelivery"
      icon={Package}
      image="/service-icon/transport.png"
      color="bg-green-500"
    />
  );
}
