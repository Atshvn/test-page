import ExpressDeliveryPage from "./ExpressDeliveryPage";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "vi" ? "Chuyển phát nhanh" : "Express Delivery";
  const description =
    locale === "vi"
      ? "Dịch vụ chuyển phát nhanh hàng đầu Việt Nam với cam kết giao hàng trong ngày hoặc hôm sau. Phù hợp cho các đơn hàng TMĐT, tài liệu quan trọng."
      : "Vietnam's leading express delivery service with same-day or next-day delivery commitment. Perfect for e-commerce and important documents.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/services/transportation/express",
    keywords:
      locale === "vi"
        ? ["chuyển phát nhanh", "giao hàng trong ngày", "giao hàng hỏa tốc"]
        : ["express delivery", "same-day delivery", "next-day delivery"],
  });
}

export default function ExpressDelivery() {
  return <ExpressDeliveryPage />;
}
