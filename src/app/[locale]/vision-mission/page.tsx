import VisionMissionPage from "@/components/pages/VisionMissionPage";
import { generateSEO } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "visionMission" });

  const title = locale === "vi" ? "Tầm nhìn & Sứ mệnh" : "Vision & Mission";
  const description =
    locale === "vi"
      ? "Khám phá tầm nhìn và sứ mệnh của NETCO Post - Cam kết mang đến dịch vụ logistics chất lượng cao và phát triển bền vững."
      : "Discover NETCO Post's vision and mission - Committed to providing world-class logistics services and sustainable development.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/vision-mission",
    keywords:
      locale === "vi"
        ? ["tầm nhìn NETCO", "sứ mệnh NETCO", "giá trị cốt lõi"]
        : ["NETCO vision", "NETCO mission", "core values"],
  });
}

export default function VisionMission() {
  return <VisionMissionPage />;
}
