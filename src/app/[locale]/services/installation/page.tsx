import InstallationPage from "./InstallationPage";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "vi"
      ? "Dịch vụ Lắp đặt & Bảo dưỡng"
      : "Installation & Maintenance";
  const description =
    locale === "vi"
      ? "Dịch vụ lắp đặt và bảo dưỡng thiết bị, sản phẩm tận nơi với đội ngũ kỹ thuật chuyên nghiệp."
      : "Professional on-site installation and maintenance services for equipment and products.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/services/installation",
    keywords:
      locale === "vi"
        ? ["lắp đặt thiết bị", "bảo dưỡng", "kỹ thuật tận nơi"]
        : ["installation", "maintenance", "on-site service"],
  });
}

export default function Installation() {
  return <InstallationPage />;
}
