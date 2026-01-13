"use client";

import { Truck } from "lucide-react";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";
import { useTranslations } from "next-intl";

export default function TransportationPage() {
  const t = useTranslations("serviceDetail.transportation.subServices");

  const subServices = [
    {
      title: t("express.title"),
      description: t("express.description"),
      href: "/services/transportation/express",
    },
    {
      title: t("economy.title"),
      description: t("economy.description"),
      href: "/services/transportation/economy",
    },
  ];

  return (
    <ServiceDetailPage
      serviceKey="transportation"
      icon={Truck}
      image="/service-icon/transport.png"
      color="bg-green-500"
      subServices={subServices}
    />
  );
}
