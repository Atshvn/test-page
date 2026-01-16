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
      title: t("standard.title"),
      description: t("standard.description"),
      href: "/services/transportation/standard",
    },
    {
      title: t("sameday.title"),
      description: t("sameday.description"),
      href: "/services/transportation/sameday",
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
