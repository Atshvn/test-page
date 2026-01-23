"use client";

import { motion } from "framer-motion";
import {
  Warehouse,
  Thermometer,
  Snowflake,
  Building2,
  BarChart3,
  MapPin,
  ScanLine,
  Calendar,
  Shield,
  Check,
  ArrowRight,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections";

const warehouseTypeIcons = [Warehouse, Thermometer, Snowflake, Building2];
const wmsFeatureIcons = [
  BarChart3,
  MapPin,
  Calendar,
  ScanLine,
  BarChart3,
  Shield,
];

export default function WarehousingPage() {
  const t = useTranslations("serviceDetail.warehousing");
  const locale = useLocale();

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          backgroundImage: "var(--hero-bg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center right",
          backgroundSize: "auto 100%",
        }}
      >
        {/* Gradient overlay - fade from left to transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-white/90 to-transparent"></div>
        {/* CSS variable for background - hidden on mobile */}
        <style jsx>{`
          section {
            --hero-bg: none;
          }
          @media (min-width: 1024px) {
            section {
              --hero-bg: url(/bg.png);
            }
          }
        `}</style>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-green-100 text-green-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                {t("badge")}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {t("title")}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t("description")}
              </p>

              {/* Hero Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {["stat1", "stat2", "stat3", "stat4"].map((stat) => (
                  <div
                    key={stat}
                    className="text-center p-4 bg-white rounded-xl shadow-sm"
                  >
                    <div className="text-xl md:text-2xl font-bold text-green-primary break-words">
                      {t(`heroStats.${stat}.value`)}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500">
                      {t(`heroStats.${stat}.label`)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-green-primary hover:bg-green-dark text-white px-8"
                >
                  <Link href={`/${locale}/contact`}>
                    {locale === "vi" ? "Liên hệ ngay" : "Contact Now"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-green-primary text-green-primary hover:bg-green-50"
                >
                  <Link href={`/${locale}/tracking`}>
                    {locale === "vi" ? "Tra cứu vận đơn" : "Track Order"}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Warehouse Types */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t("types.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num, index) => {
              const Icon = warehouseTypeIcons[index];
              return (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl"
                >
                  <div className="w-14 h-14 bg-green-primary rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {t(`types.list.type${num}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {t(`types.list.type${num}.description`)}
                  </p>
                  <ul className="space-y-2">
                    {[0, 1, 2].map((idx) => {
                      try {
                        const feature = t(
                          `types.list.type${num}.features.${idx}`,
                        );
                        return (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <Check className="w-4 h-4 text-green-primary" />
                            {feature}
                          </li>
                        );
                      } catch {
                        return null;
                      }
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WMS System */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t("wms.title")}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {t("wms.description")}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((num, index) => {
                  const Icon = wmsFeatureIcons[index];
                  return (
                    <div
                      key={num}
                      className="flex items-start gap-3 bg-white p-4 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-green-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {t(`wms.features.feature${num}.title`)}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {t(`wms.features.feature${num}.description`)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-green-primary to-green-dark rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">
                  {t("services.title")}
                </h3>
                <ul className="space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <li key={num} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-200" />
                      <span className="text-white/90">
                        {t(`services.list.service${num}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t("certifications.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3, 4].map((num, index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-2xl"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t(`certifications.list.cert${num}.title`)}
                </h3>
                <p className="text-sm text-gray-600">
                  {t(`certifications.list.cert${num}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn kho bãi NETCO?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num, index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-green-primary" />
                </div>
                <p className="text-gray-700 font-medium">
                  {t(`features.feature${num}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
