import AboutPage from "@/components/pages/AboutPage";
import { generateSEO } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const title = locale === "vi" ? "Về chúng tôi" : "About Us";
  const description =
    locale === "vi"
      ? "Tìm hiểu về NETCO Post - Đơn vị chuyển phát nhanh hàng đầu Việt Nam với sứ mệnh mang đến dịch vụ logistics chất lượng cao."
      : "Learn about NETCO Post - Vietnam's leading express delivery service committed to providing world-class logistics solutions.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/about",
    keywords:
      locale === "vi"
        ? ["về NETCO", "công ty vận chuyển", "lịch sử NETCO"]
        : ["about NETCO", "company history", "logistics company"],
  });
}

export default function About() {
  return <AboutPage />;
}
