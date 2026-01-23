"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { LucideIcon } from "lucide-react";
import { CTA } from "@/components/sections";

interface SubService {
  title: string;
  description: string;
  href: string;
}

interface ServiceDetailPageProps {
  serviceKey:
    | "transportation"
    | "fulfillment"
    | "warehousing"
    | "installation"
    | "other";
  icon: LucideIcon;
  image: string;
  color: string;
  subServices?: SubService[];
}

export default function ServiceDetailPage({
  serviceKey,
  icon: Icon,
  image,
  color,
  subServices,
}: ServiceDetailPageProps) {
  const t = useTranslations("serviceDetail");
  const locale = useLocale();

  const features = [
    t(`${serviceKey}.features.feature1`),
    t(`${serviceKey}.features.feature2`),
    t(`${serviceKey}.features.feature3`),
    t(`${serviceKey}.features.feature4`),
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-green-100 text-green-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                {t(`${serviceKey}.badge`)}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-dark mb-6">
                {t(`${serviceKey}.title`)}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t(`${serviceKey}.description`)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-green-primary hover:bg-green-dark text-white px-8"
                >
                  <Link href={`/${locale}/contact`}>
                    {t("cta.button")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div
                  className={`absolute inset-0 ${color} rounded-3xl opacity-10`}
                ></div>
                <div className="absolute inset-4 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                  <Image
                    src={image}
                    alt={t(`${serviceKey}.title`)}
                    width={300}
                    height={300}
                    className="object-contain p-8"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-dark mb-4">
              {t("whyChoose")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-green-primary" />
                </div>
                <p className="text-gray-700 font-medium">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub Services Section (if available) */}
      {subServices && subServices.length > 0 && (
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {subServices.map((subService, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/${locale}${subService.href}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 group cursor-pointer h-full">
                      <div
                        className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-6`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-green-dark mb-3 group-hover:text-green-primary transition-colors">
                        {subService.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {subService.description}
                      </p>
                      <span className="inline-flex items-center text-green-primary font-medium">
                        {t("learnMore")}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </main>
  );
}
