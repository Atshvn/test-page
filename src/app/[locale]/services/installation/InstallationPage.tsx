"use client";

import { Wrench } from "lucide-react";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";

export default function InstallationPage() {
  return (
    <ServiceDetailPage
      serviceKey="installation"
      icon={Wrench}
      image="/service-icon/maintain.png"
      color="bg-purple-500"
    />
  );
}
