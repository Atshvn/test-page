"use client";

import { motion } from "framer-motion";
import {
  Package,
  Clock,
  Shield,
  Headphones,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections";

const benefits = [
  {
    icon: Package,
    title: "Secure Handling",
    description:
      "Your cargo is handled with utmost care and security throughout the journey.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "We guarantee timely delivery with our efficient logistics network.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "All shipments are fully insured for your peace of mind.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our dedicated team is available round the clock to assist you.",
  },
];

export default function ServicesPage() {
  const t = useTranslations("serviceDetail");
  const servicesT = useTranslations("services");
  const locale = useLocale();

  const services = [
    {
      number: "01",
      title: servicesT("list.transportation.title"),
      description: servicesT("list.transportation.description"),
      image: "/service-icon/xe-oto.png",
      badge: t("transportation.badge"),
      features: [
        t("transportation.features.feature1"),
        t("transportation.features.feature2"),
        t("transportation.features.feature3"),
        t("transportation.features.feature4"),
      ],
      link: "/services/transportation",
    },
    {
      number: "02",
      title: servicesT("list.fulfillment.title"),
      description: servicesT("list.fulfillment.description"),
      image: "/service-icon/fulfillment.png",
      badge: t("fulfillment.badge"),
      features: [
        t("fulfillment.features.feature1"),
        t("fulfillment.features.feature2"),
        t("fulfillment.features.feature3"),
        t("fulfillment.features.feature4"),
      ],
      link: "/services/fulfillment",
    },
    {
      number: "03",
      title: servicesT("list.installation.title"),
      description: servicesT("list.installation.description"),
      image: "/service-icon/maintain.png",
      badge: t("installation.badge"),
      features: [
        t("installation.features.feature1"),
        t("installation.features.feature2"),
        t("installation.features.feature3"),
        t("installation.features.feature4"),
      ],
      link: "/services/installation",
    },
    {
      number: "04",
      title: servicesT("list.other.title"),
      description: servicesT("list.other.description"),
      image: "/service-icon/other.png",
      badge: t("other.badge"),
      features: [
        t("other.features.feature1"),
        t("other.features.feature2"),
        t("other.features.feature3"),
        t("other.features.feature4"),
      ],
      link: "/services/other",
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
              {servicesT("title")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-dark mb-6">
              {servicesT("title")}
            </h1>
            <p className="text-xl text-gray-600">
              {servicesT("list.transportation.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-green-primary font-medium text-lg">
                      {service.number}
                    </span>
                    <span className="text-sm text-gray-500 bg-green-100 px-3 py-1 rounded-full">
                      {service.badge}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-green-dark mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="bg-green-primary hover:bg-green-dark text-white"
                  >
                    <Link href={`/${locale}${service.link}`}>
                      {t("learnMore")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                <div
                  className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl aspect-video flex items-center justify-center p-8">
                    <div className="relative w-full h-full">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-dark mb-4">
              {t("whyChoose")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We go above and beyond to ensure your logistics experience is
              seamless.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm text-center"
              >
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-green-primary" />
                </div>
                <h3 className="text-xl font-bold text-green-dark mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA/>
    </main>
  );
}
