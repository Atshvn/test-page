import SamedayDeliveryPage from "./SamedayDeliveryPage";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "vi" ? "Chuyển phát trong ngày" : "Same-day Delivery";
  const description =
    locale === "vi"
      ? "Dịch vụ chuyển phát trong ngày - Giao hàng siêu tốc trong 4-8 giờ. Đặt hàng trước 9h30 sáng, nhận hàng trong cùng ngày từ 15h-24h."
      : "Same-day delivery service - Super fast delivery in 4-8 hours. Order before 9:30 AM, receive same day from 3PM-12AM.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/services/transportation/sameday",
    keywords:
      locale === "vi"
        ? ["chuyển phát trong ngày", "giao hàng siêu tốc", "giao hàng cùng ngày"]
        : ["same-day delivery", "super fast delivery", "immediate delivery"],
  });
}

export default function SamedayDelivery() {
  return <SamedayDeliveryPage />;
}
