"use client";

import { Wallet } from "lucide-react";
import SubServiceDetailPage from "@/components/pages/SubServiceDetailPage";

export default function EconomyDeliveryPage() {
  return (
    <SubServiceDetailPage
      serviceKey="economyDelivery"
      icon={Wallet}
      image="/service-icon/transport.png"
      color="bg-green-500"
      showComparison={true}
    />
  );
}
