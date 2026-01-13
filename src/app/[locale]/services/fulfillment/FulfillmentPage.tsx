"use client";

import { Package } from "lucide-react";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";

export default function FulfillmentPage() {
  return (
    <ServiceDetailPage
      serviceKey="fulfillment"
      icon={Package}
      image="/service-icon/fulfillment.png"
      color="bg-orange-500"
    />
  );
}
