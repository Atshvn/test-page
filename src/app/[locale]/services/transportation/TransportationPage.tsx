"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Wallet,
  Check,
  ArrowRight,
  Package,
  Shield,
  MapPin,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections";

const subServiceColors = [
  { bg: "bg-red-500", light: "bg-red-100", text: "text-red-600" },
  { bg: "bg-green-500", light: "bg-green-100", text: "text-green-600" },
];

export default function TransportationPage() {
  const t = useTranslations("serviceDetail.transportation");
  const locale = useLocale();

  const subServices = [
    {
      key: "express",
      icon: Zap,
      color: subServiceColors[0],
      href: "/services/transportation/express",
    },
    {
      key: "economy",
      icon: Wallet,
      color: subServiceColors[1],
      href: "/services/transportation/economy",
    },
  ];

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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-dark mb-6">
                {t("title")}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t("description")}
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-primary" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {t(`features.feature${num}`)}
                    </span>
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
                  <Link href={`/${locale}/tracking/calculator`}>
                    {locale === "vi" ? "Ước tính cước phí" : "Calculate Shipping"}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sub Services - Cards */}
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
              {t("subServices.heading")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("subServices.subheading")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {subServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={`/${locale}${service.href}`}
                    className="block h-full"
                  >
                    <div className="bg-white border-2 border-gray-100 hover:border-green-primary p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 h-full group">
                      <div
                        className={`w-14 h-14 ${service.color.bg} rounded-xl flex items-center justify-center mb-4`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-green-dark mb-2 group-hover:text-green-primary transition-colors">
                        {t(`subServices.${service.key}.title`)}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {t(`subServices.${service.key}.description`)}
                      </p>
                      <div className="flex items-center text-green-primary font-medium">
                        {t("subServices.learnMore")}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-dark mb-4">
              {t("whyChoose.heading")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Timer,
                key: "fast",
              },
              {
                icon: Shield,
                key: "safe",
              },
              {
                icon: MapPin,
                key: "wide",
              },
              {
                icon: Package,
                key: "diverse",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm text-center"
                >
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-green-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-green-dark mb-2">
                    {t(`whyChoose.reasons.${item.key}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t(`whyChoose.reasons.${item.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
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
              {t("comparison.heading")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-x-auto"
          >
            <table className="w-full max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-green-primary text-white">
                  <th className="p-4 text-left">
                    {t("comparison.table.feature")}
                  </th>
                  <th className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      {t("comparison.table.express")}
                    </div>
                  </th>
                  <th className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Wallet className="w-4 h-4" />
                      {t("comparison.table.economy")}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">
                    {t("comparison.table.deliveryTime")}
                  </td>
                  <td className="p-4 text-center">
                    {t("comparison.table.deliveryTimeExpress")}
                  </td>
                  <td className="p-4 text-center">
                    {t("comparison.table.deliveryTimeEconomy")}
                  </td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-medium">
                    {t("comparison.table.price")}
                  </td>
                  <td className="p-4 text-center">
                    {t("comparison.table.priceExpress")}
                  </td>
                  <td className="p-4 text-center">
                    {t("comparison.table.priceEconomy")}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">
                    {t("comparison.table.cod")}
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-medium">
                    {t("comparison.table.insurance")}
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">
                    {t("comparison.table.bestFor")}
                  </td>
                  <td className="p-4 text-center text-sm">
                    {t("comparison.table.bestForExpress")}
                  </td>
                  <td className="p-4 text-center text-sm">
                    {t("comparison.table.bestForEconomy")}
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
