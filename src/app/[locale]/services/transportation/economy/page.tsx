import EconomyDeliveryPage from "./EconomyDeliveryPage";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "vi" ? "Chuyển phát tiết kiệm" : "Economy Delivery";
  const description =
    locale === "vi"
      ? "Giải pháp vận chuyển tối ưu chi phí cho các đơn hàng không gấp. Tiết kiệm đến 30% chi phí so với chuyển phát nhanh."
      : "Cost-effective shipping solution for non-urgent orders. Save up to 30% compared to express delivery.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/services/transportation/economy",
    keywords:
      locale === "vi"
        ? ["chuyển phát tiết kiệm", "giao hàng giá rẻ", "vận chuyển tiết kiệm"]
        : ["economy delivery", "cheap shipping", "budget delivery"],
  });
}

export default function EconomyDelivery() {
  return <EconomyDeliveryPage />;
}
