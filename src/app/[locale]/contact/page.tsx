import ContactPage from "@/components/pages/ContactPage";
import type { Province } from "@/components/forms/ContactForm";
import { generateSEO } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { COMPANY_INFO } from "@/lib/constants";
import type { Metadata } from "next";
import { getProvinces } from "@/actions/address";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "vi" ? "Liên hệ" : "Contact Us";
  const description =
    locale === "vi"
      ? `Liên hệ NETCO Post để được hỗ trợ dịch vụ chuyển phát nhanh 24/7. Hotline: ${COMPANY_INFO.hotline}`
      : `Contact NETCO Post for 24/7 express delivery support. Hotline: ${COMPANY_INFO.hotline}`;

  return generateSEO({
    title,
    description,
    locale,
    path: "/contact",
    keywords:
      locale === "vi"
        ? ["liên hệ NETCO", "hotline NETCO", "hỗ trợ khách hàng"]
        : ["contact NETCO", "customer support", "NETCO hotline"],
  });
}

export default async function Contact() {
  const { success, data } = await getProvinces();
  const provinces = success && Array.isArray(data) ? (data as Province[]) : [];

  return <ContactPage provinces={provinces} />;
}
