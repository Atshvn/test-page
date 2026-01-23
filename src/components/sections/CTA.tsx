"use client";

import { motion } from "framer-motion";
import { ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function CTA() {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <section className="py-20 bg-gradient-to-r from-green-primary to-green-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full mb-6">
              <Truck className="w-4 h-4" />
              <span className="text-sm font-medium">{t("badge")}</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t("title")}
            </h2>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-6.5 text-lg "
              >
                <Link href={`/${locale}/contact`}>
                  {t("getStarted")}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white hover:bg-white hover:text-green-dark px-8 py-6 text-lg"
              >
                <Link href={`/${locale}/about`}>{t("learnMore")}</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20"
          >
            <div>
              <p className="text-4xl font-bold text-white">34+</p>
              <p className="text-white/70">{t("stats.provinces")}</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">70K+</p>
              <p className="text-white/70">{t("stats.customers")}</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">99%</p>
              <p className="text-white/70">{t("stats.onTime")}</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white">24/7</p>
              <p className="text-white/70">{t("stats.support")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
