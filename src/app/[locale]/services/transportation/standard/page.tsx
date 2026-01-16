import StandardDeliveryPage from "./StandardDeliveryPage";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "vi" ? "Chuyển phát tiêu chuẩn" : "Standard Delivery";
  const description =
    locale === "vi"
      ? "Dịch vụ chuyển phát tiêu chuẩn - Cân bằng giữa tốc độ và chi phí. Thời gian giao hàng ổn định, phù hợp cho hàng hóa thông thường."
      : "Standard delivery service - Balance between speed and cost. Stable delivery time, suitable for regular goods.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/services/transportation/standard",
    keywords:
      locale === "vi"
        ? ["chuyển phát tiêu chuẩn", "giao hàng ổn định", "vận chuyển tiêu chuẩn"]
        : ["standard delivery", "reliable shipping", "standard shipping"],
  });
}

export default function StandardDelivery() {
  return <StandardDeliveryPage />;
}
