import ServicesPage from "@/components/pages/ServicesPage";
import { getTranslations } from "next-intl/server";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "vi" ? "Dịch vụ" : "Services";
  const description =
    locale === "vi"
      ? "Khám phá các dịch vụ chuyển phát nhanh, vận chuyển hàng hóa, kho bãi và fulfillment của NETCO Post."
      : "Discover NETCO Post's express delivery, freight, warehousing and fulfillment services.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/services",
    keywords:
      locale === "vi"
        ? ["dịch vụ NETCO", "chuyển phát nhanh", "vận chuyển hàng hóa"]
        : ["NETCO services", "express delivery", "freight services"],
  });
}

export default function Services() {
  return <ServicesPage />;
}
