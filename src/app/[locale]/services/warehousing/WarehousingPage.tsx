"use client";

import { Warehouse } from "lucide-react";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";

export default function WarehousingPage() {
  return (
    <ServiceDetailPage
      serviceKey="warehousing"
      icon={Warehouse}
      image="/service-icon/warehorse.png"
      color="bg-blue-500"
    />
  );
}
