"use client";

import { Zap } from "lucide-react";
import SubServiceDetailPage from "@/components/pages/SubServiceDetailPage";

export default function ExpressDeliveryPage() {
  return (
    <SubServiceDetailPage
      serviceKey="expressDelivery"
      icon={Zap}
      image="/service-icon/transport.png"
      color="bg-green-500"
    />
  );
}
