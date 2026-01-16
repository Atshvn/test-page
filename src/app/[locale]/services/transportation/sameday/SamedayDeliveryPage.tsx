"use client";

import { Clock } from "lucide-react";
import SubServiceDetailPage from "@/components/pages/SubServiceDetailPage";

export default function SamedayDeliveryPage() {
  return (
    <SubServiceDetailPage
      serviceKey="samedayDelivery"
      icon={Clock}
      image="/service-icon/transport.png"
      color="bg-green-500"
      showProcess={true}
    />
  );
}
