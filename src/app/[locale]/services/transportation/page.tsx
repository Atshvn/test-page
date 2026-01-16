import TransportationPage from "./TransportationPage";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "vi" ? "Dịch vụ Vận chuyển" : "Transportation Services";
  const description =
    locale === "vi"
      ? "Dịch vụ vận chuyển hàng hóa nhanh chóng, an toàn với mạng lưới phủ khắp cả nước."
      : "Fast and safe freight transportation service with nationwide coverage.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/services/transportation",
    keywords:
      locale === "vi"
        ? ["vận chuyển hàng hóa", "giao hàng toàn quốc", "dịch vụ vận tải"]
        : [
            "freight transportation",
            "nationwide delivery",
            "transport services",
          ],
  });
}

export default function Transportation() {
  return <TransportationPage />;
}
