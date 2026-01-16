"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { useLocale } from "next-intl";
import ContactForm, { type Province } from "@/components/forms/ContactForm";

interface ContactPageProps {
  provinces: Province[];
}

export default function ContactPage({ provinces = [] }: ContactPageProps) {
  const locale = useLocale();
  const isVietnamese = locale === "vi";

  const contactInfo = [
    {
      icon: MapPin,
      title: isVietnamese ? "Địa chỉ" : "Visit Us",
      details: isVietnamese
        ? [
            COMPANY_INFO.address.vi.street,
            COMPANY_INFO.address.vi.city,
            COMPANY_INFO.address.vi.country,
          ]
        : [
            COMPANY_INFO.address.en.street,
            COMPANY_INFO.address.en.city,
            COMPANY_INFO.address.en.country,
          ],
    },
    {
      icon: Phone,
      title: isVietnamese ? "Điện thoại" : "Call Us",
      details: [COMPANY_INFO.hotline],
    },
    {
      icon: Mail,
      title: "Email",
      details: [COMPANY_INFO.email, COMPANY_INFO.emailSupport],
    },
    {
      icon: Clock,
      title: isVietnamese ? "Giờ làm việc" : "Working Hours",
      details: isVietnamese
        ? [
            COMPANY_INFO.workingHours.vi.weekdays,
            COMPANY_INFO.workingHours.vi.saturday,
          ]
        : [
            COMPANY_INFO.workingHours.en.weekdays,
            COMPANY_INFO.workingHours.en.saturday,
          ],
    },
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-green-100 text-green-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              {isVietnamese ? "Liên hệ" : "Contact Us"}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-dark mb-6">
              {isVietnamese ? "Liên hệ với chúng tôi" : "Get in Touch With Us"}
            </h1>
            <p className="text-xl text-gray-600">
              {isVietnamese
                ? "Bạn có câu hỏi hoặc cần báo giá? Chúng tôi luôn sẵn sàng hỗ trợ bạn."
                : "Have a question or need a quote? We're here to help. Reach out to us and we'll respond as soon as possible."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-bold text-green-dark mb-8">
                {isVietnamese ? "Thông tin liên hệ" : "Contact Information"}
              </h2>
              <div className="space-y-8">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-green-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-dark mb-1">
                        {item.title}
                      </h3>
                      {item.details.map((detail, index) => (
                        <p key={index} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <ContactForm
                provinces={provinces}
                locale={locale}
                isVietnamese={isVietnamese}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
