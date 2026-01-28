"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function Services() {
  const t = useTranslations("services");
  const locale = useLocale();

  const services = [
    {
      number: "01",
      title: t("list.transportation.title"),
      description: t("list.transportation.description"),
      image: "/service-icon/xe-oto.png",
      link: "/services/transportation",
    },
    {
      number: "02",
      title: t("list.fulfillment.title"),
      description: t("list.fulfillment.description"),
      image: "/service-icon/fulfillment.png",
      link: "/services/fulfillment",
    },
    {
      number: "03",
      title: t("list.installation.title"),
      description: t("list.installation.description"),
      image: "/service-icon/maintain.png",
      link: "/services/installation",
    },
    {
      number: "04",
      title: t("list.other.title"),
      description: t("list.other.description"),
      image: "/service-icon/other.png",
      link: "/services/other",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-green-dark">
            {t("title")}
          </h2>
        </motion.div>

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/${locale}${service.link}`}>
                {/* Mobile Layout */}
                <div className="group flex flex-col py-6 border-b border-gray-200 transition-colors duration-300 cursor-pointer gap-3 md:hidden">
                  {/* Number */}
                  <span className="text-green-primary font-medium text-base">
                    {service.number}
                  </span>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl font-semibold text-green-primary">
                    {service.title}
                  </h3>

                  {/* Arrow */}
                  <div className="flex justify-end pt-2">
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-green-primary group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="group hidden md:grid md:grid-cols-12 items-center py-10 border-b border-gray-200 transition-colors duration-300 cursor-pointer">
                  {/* Left - Number & Description */}
                  <div className="md:col-span-2">
                    <span className="text-green-primary font-medium text-lg mb-2 block">
                      {service.number}
                    </span>
                    <p className="text-gray-500 text-sm leading-relaxed pr-4 hidden lg:block">
                      {service.description}
                    </p>
                  </div>

                  {/* Center - Title */}
                  <div className="md:col-span-7 flex items-center justify-center w-full">
                    <h3 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-400 group-hover:text-green-dark transition-colors duration-300 whitespace-nowrap">
                      {service.title}
                    </h3>
                  </div>

                  {/* Right - Icon (appears on hover) */}
                  <div className="md:col-span-2 flex items-center justify-center">
                    <div className="relative w-32 h-20 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="md:col-span-1 flex items-center justify-end">
                    <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-green-primary group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
