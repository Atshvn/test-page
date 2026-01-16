import OtherPage from "./OtherPage";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "vi" ? "Dịch vụ Khác" : "Other Services";
  const description =
    locale === "vi"
      ? "Các dịch vụ tùy chỉnh theo nhu cầu riêng của khách hàng, linh hoạt và đa dạng."
      : "Custom services tailored to your specific needs, flexible and diverse.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/services/other",
    keywords:
      locale === "vi"
        ? ["dịch vụ khác", "dịch vụ tùy chỉnh", "giải pháp logistics"]
        : ["other services", "custom services", "logistics solutions"],
  });
}

export default function Other() {
  return <OtherPage />;
}
