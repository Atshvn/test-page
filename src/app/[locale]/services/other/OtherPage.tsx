"use client";

import { motion } from "framer-motion";
import {
  Settings,
  Truck,
  Snowflake,
  Globe,
  Banknote,
  Package,
  Lightbulb,
  Check,
  ArrowRight,
  Tag,
  Layers,
  Search,
  RefreshCw,
  Puzzle,
  Recycle,
  ShoppingCart,
  Store,
  Smartphone,
  Pill,
  Utensils,
  Sofa,
  Sparkles,
  Shirt,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections";

const serviceIcons = [Truck, Snowflake, Globe, Banknote, Package, Lightbulb];
const vasIcons = [Tag, Layers, Search, RefreshCw, Puzzle, Recycle];
const industryIcons = [
  ShoppingCart,
  Store,
  Smartphone,
  Pill,
  Utensils,
  Sofa,
  Sparkles,
  Shirt,
];

export default function OtherPage() {
  const t = useTranslations("serviceDetail.other");
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
                    <div className="text-2xl md:text-3xl font-bold text-green-primary">
                      {t(`heroStats.${stat}.value`)}
                    </div>
                    <div className="text-sm text-gray-500">
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
                  <Link href={`/${locale}/tracking/calculator`}>
                    {locale === "vi" ? "Ước tính cước phí" : "Calculate Shipping"}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t("overview.title")}
            </h2>
            <p className="text-lg text-gray-600">{t("overview.description")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="bg-green-50 p-4 rounded-xl flex items-center gap-3"
              >
                <Check className="w-5 h-5 text-green-primary flex-shrink-0" />
                <span className="text-gray-700 font-medium">
                  {t(`features.feature${num}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
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
              {t("services.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((num, index) => {
              const Icon = serviceIcons[index];
              return (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-green-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {t(`services.list.service${num}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {t(`services.list.service${num}.description`)}
                  </p>
                  <ul className="space-y-2">
                    {[0, 1, 2].map((idx) => {
                      try {
                        const feature = t(
                          `services.list.service${num}.features.${idx}`,
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

      {/* VAS Section */}
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
              {t("vas.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((num, index) => {
              const Icon = vasIcons[index];
              return (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-green-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {t(`vas.list.vas${num}.title`)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t(`vas.list.vas${num}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries */}
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
              {t("industries.title")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => {
              const Icon = industryIcons[index];
              return (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white p-4 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <Icon className="w-8 h-8 text-green-primary mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">
                    {t(`industries.list.industry${num}`)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
