"use client";

import { motion } from "framer-motion";
import { PageHero, Section, Container } from "@/components/ui/page-sections";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import InfoSidebar from "@/components/ui/info-sidebar";

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <PageHero
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
        variant="gradient"
      />

      {/* Last Updated */}
      <Section background="white" padding="sm" className="border-b">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-sm text-gray-500">
              {locale === "vi" ? "Cập nhật lần cuối: 16 Tháng 1, 2026" : "Last Updated: January 16, 2026"}
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Main Content with Sidebar */}
      <Section background="gray" padding="lg">
        <Container size="xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                {/* PDF Viewer */}
                <div className="w-full h-[800px] lg:h-[1000px]">
                  <iframe
                    src="https://mediaimages.vps.vn/Image/ckfinder/files/qd197-chinh-sach-bao-mat-netco.pdf"
                    className="w-full h-full border-0"
                    title={locale === "vi" ? "Chính sách bảo mật NETCO" : "NETCO Privacy Policy"}
                  />
                </div>
                
                {/* Download Link */}
                <div className="p-6 bg-gray-50 border-t">
                  <a
                    href="https://mediaimages.vps.vn/Image/ckfinder/files/qd197-chinh-sach-bao-mat-netco.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-primary hover:text-green-dark font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {locale === "vi" ? "Tải xuống PDF" : "Download PDF"}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <InfoSidebar locale={locale} />
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section background="green" padding="lg">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {locale === "vi" ? "Có câu hỏi về Chính sách Bảo mật?" : "Questions About Privacy?"}
            </h2>
            <p className="text-lg text-white/90 mb-6">
              {locale === "vi" 
                ? "Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về Chính sách Bảo mật của chúng tôi, vui lòng liên hệ với chúng tôi."
                : "If you have any questions or concerns about our Privacy Policy, please don't hesitate to contact us."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-white">
              <div className="flex items-center justify-center gap-2">
                <span className="font-medium">Email:</span>
                <a href="mailto:privacy@netco.com.vn" className="hover:underline">
                  privacy@netco.com.vn
                </a>
              </div>
              <div className="hidden sm:block text-white/50">|</div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-medium">{locale === "vi" ? "Điện thoại" : "Phone"}:</span>
                <a href="tel:+842838362088" className="hover:underline">
                  +84 28 3836 2088
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}
