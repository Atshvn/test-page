"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Clock, MapPin, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { LucideIcon } from "lucide-react";

interface SubServiceDetailPageProps {
  serviceKey: "expressDelivery" | "economyDelivery";
  icon: LucideIcon;
  image: string;
  color: string;
  showComparison?: boolean;
}

export default function SubServiceDetailPage({
  serviceKey,
  icon: Icon,
  image,
  color,
  showComparison = false,
}: SubServiceDetailPageProps) {
  const t = useTranslations("serviceDetail");
  const locale = useLocale();

  const heroStats = [
    {
      value: t(`${serviceKey}.heroStats.stat1.value`),
      label: t(`${serviceKey}.heroStats.stat1.label`),
    },
    {
      value: t(`${serviceKey}.heroStats.stat2.value`),
      label: t(`${serviceKey}.heroStats.stat2.label`),
    },
    {
      value: t(`${serviceKey}.heroStats.stat3.value`),
      label: t(`${serviceKey}.heroStats.stat3.label`),
    },
    {
      value: t(`${serviceKey}.heroStats.stat4.value`),
      label: t(`${serviceKey}.heroStats.stat4.label`),
    },
  ];

  const features = [
    {
      title: t(`${serviceKey}.features.list.feature1.title`),
      description: t(`${serviceKey}.features.list.feature1.description`),
    },
    {
      title: t(`${serviceKey}.features.list.feature2.title`),
      description: t(`${serviceKey}.features.list.feature2.description`),
    },
    {
      title: t(`${serviceKey}.features.list.feature3.title`),
      description: t(`${serviceKey}.features.list.feature3.description`),
    },
    {
      title: t(`${serviceKey}.features.list.feature4.title`),
      description: t(`${serviceKey}.features.list.feature4.description`),
    },
    {
      title: t(`${serviceKey}.features.list.feature5.title`),
      description: t(`${serviceKey}.features.list.feature5.description`),
    },
    {
      title: t(`${serviceKey}.features.list.feature6.title`),
      description: t(`${serviceKey}.features.list.feature6.description`),
    },
  ];

  const pricingZones = [
    {
      title: t(`${serviceKey}.pricing.zones.sameCity.title`),
      price: t(`${serviceKey}.pricing.zones.sameCity.price`),
      time: t(`${serviceKey}.pricing.zones.sameCity.time`),
    },
    {
      title: t(`${serviceKey}.pricing.zones.nearProvince.title`),
      price: t(`${serviceKey}.pricing.zones.nearProvince.price`),
      time: t(`${serviceKey}.pricing.zones.nearProvince.time`),
    },
    {
      title: t(`${serviceKey}.pricing.zones.farProvince.title`),
      price: t(`${serviceKey}.pricing.zones.farProvince.price`),
      time: t(`${serviceKey}.pricing.zones.farProvince.time`),
    },
  ];

  const useCases = [
    t(`${serviceKey}.useCases.list.case1`),
    t(`${serviceKey}.useCases.list.case2`),
    t(`${serviceKey}.useCases.list.case3`),
    t(`${serviceKey}.useCases.list.case4`),
    t(`${serviceKey}.useCases.list.case5`),
    t(`${serviceKey}.useCases.list.case6`),
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
              <span
                className={`inline-block ${color} text-white px-4 py-2 rounded-full text-sm font-medium mb-4`}
              >
                {t(`${serviceKey}.badge`)}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-dark mb-6">
                {t(`${serviceKey}.title`)}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t(`${serviceKey}.description`)}
              </p>

              {/* Hero Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {heroStats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-white rounded-xl shadow-sm"
                  >
                    <p
                      className={`text-2xl font-bold ${color.replace(
                        "bg-",
                        "text-"
                      )}`}
                    >
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className={`${color} hover:opacity-90 text-white px-8`}
                >
                  <Link href={`/${locale}/contact`}>
                    {t(`${serviceKey}.cta.button`)}
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
                    {t(`${serviceKey}.cta.buttonSecondary`)}
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
                <div className="absolute inset-4 bg-white rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
                  <Image
                    src={image}
                    alt={t(`${serviceKey}.title`)}
                    width={400}
                    height={400}
                    className="object-contain p-4"
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
              {t(`${serviceKey}.features.title`)}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-green-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Only for Express */}
      {serviceKey === "expressDelivery" && (
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
                {t(`${serviceKey}.process.title`)}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white p-6 rounded-2xl text-center h-full">
                    <div
                      className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg`}
                    >
                      {step}
                    </div>
                    <h3 className="text-lg font-bold text-green-dark mb-2">
                      {t(`${serviceKey}.process.steps.step${step}.title`)}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t(`${serviceKey}.process.steps.step${step}.description`)}
                    </p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Section - Only for Economy */}
      {showComparison && (
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
                {t(`${serviceKey}.comparison.title`)}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <table className="w-full">
                <thead className={`${color} text-white`}>
                  <tr>
                    <th className="py-4 px-6 text-left">
                      {t(`${serviceKey}.comparison.headers.feature`)}
                    </th>
                    <th className="py-4 px-6 text-center">
                      {t(`${serviceKey}.comparison.headers.express`)}
                    </th>
                    <th className="py-4 px-6 text-center">
                      {t(`${serviceKey}.comparison.headers.economy`)}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((row, index) => (
                    <tr
                      key={row}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="py-4 px-6 font-medium text-gray-700">
                        {t(`${serviceKey}.comparison.rows.row${row}.feature`)}
                      </td>
                      <td className="py-4 px-6 text-center text-gray-600">
                        {t(`${serviceKey}.comparison.rows.row${row}.express`)}
                      </td>
                      <td className="py-4 px-6 text-center font-semibold text-green-primary">
                        {t(`${serviceKey}.comparison.rows.row${row}.economy`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
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
              {t(`${serviceKey}.pricing.title`)}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(`${serviceKey}.pricing.description`)}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingZones.map((zone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-2xl text-center ${
                  index === 1 ? `${color} text-white` : "bg-gray-50"
                }`}
              >
                <MapPin
                  className={`w-8 h-8 mx-auto mb-4 ${
                    index === 1 ? "text-white" : color.replace("bg-", "text-")
                  }`}
                />
                <h3
                  className={`text-lg font-bold mb-2 ${
                    index === 1 ? "text-white" : "text-green-dark"
                  }`}
                >
                  {zone.title}
                </h3>
                <p
                  className={`text-2xl font-bold mb-2 ${
                    index === 1 ? "text-white" : color.replace("bg-", "text-")
                  }`}
                >
                  {zone.price}
                </p>
                <p
                  className={`text-sm ${
                    index === 1 ? "text-white/80" : "text-gray-600"
                  }`}
                >
                  <Clock className="w-4 h-4 inline mr-1" />
                  {zone.time}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
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
              {t(`${serviceKey}.useCases.title`)}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm"
              >
                <div
                  className={`w-8 h-8 ${color} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  {useCase}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 md:py-20 ${color}`}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              {t(`${serviceKey}.cta.title`)}
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {t(`${serviceKey}.cta.description`)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-green-dark hover:bg-gray-100 px-8"
              >
                <Link href={`/${locale}/contact`}>
                  {t(`${serviceKey}.cta.button`)}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white/10 px-8"
              >
                <Link href={`/${locale}/tracking`}>
                  {t(`${serviceKey}.cta.buttonSecondary`)}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
