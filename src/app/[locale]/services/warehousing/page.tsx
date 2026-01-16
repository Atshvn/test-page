import WarehousingPage from "./WarehousingPage";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "vi" ? "Dịch vụ Kho bãi & Lưu trữ" : "Warehousing & Storage";
  const description =
    locale === "vi"
      ? "Hệ thống kho bãi hiện đại, đáp ứng nhu cầu lưu trữ và quản lý hàng hóa chuyên nghiệp."
      : "Modern warehousing system for professional storage and inventory management.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/services/warehousing",
    keywords:
      locale === "vi"
        ? ["kho bãi", "lưu trữ hàng hóa", "quản lý kho"]
        : ["warehousing", "storage", "inventory management"],
  });
}

export default function Warehousing() {
  return <WarehousingPage />;
}
