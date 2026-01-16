import FulfillmentPage from "./FulfillmentPage";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "vi" ? "Dịch vụ Fulfillment" : "Fulfillment Services";
  const description =
    locale === "vi"
      ? "Giải pháp fulfillment toàn diện từ lưu kho, đóng gói đến giao hàng cho khách cuối."
      : "Complete fulfillment solution from storage, packing to last-mile delivery.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/services/fulfillment",
    keywords:
      locale === "vi"
        ? ["fulfillment", "hoàn tất đơn hàng", "giao hàng cho shop"]
        : ["fulfillment", "order fulfillment", "e-commerce fulfillment"],
  });
}

export default function Fulfillment() {
  return <FulfillmentPage />;
}
