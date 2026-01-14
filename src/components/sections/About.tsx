"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";

const stats = [
  { value: "34", suffix: "", labelKey: "provinces" },
  { value: "100", suffix: "+", labelKey: "branches" },
  { value: "750", suffix: "+", labelKey: "vehicles" },
  { value: "4", suffix: "", labelKey: "centers" },
];

export default function About() {
  const t = useTranslations("about");

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-stretch">
          {/* Left Content - Full Height Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[500px] lg:min-h-[650px]"
          >
            <Image
              src="/anh.png"
              alt={t("imageAlt")}
              fill
              className="object-cover object-right rounded-2xl"
              priority
            />
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-dark mb-4 md:mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              {t("description")}
            </p>

            {/* Tầm nhìn & Sứ mệnh */}
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-green-primary p-5 md:p-6 rounded-2xl"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 md:w-7 md:h-7 text-green-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  {t("vision.title")}
                </h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed">
                  {t("vision.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-green-primary p-5 md:p-6 rounded-2xl"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 md:w-7 md:h-7 text-green-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  {t("mission.title")}
                </h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed">
                  {t("mission.description")}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button className="w-full sm:w-auto bg-green-primary hover:bg-green-dark text-white px-8 md:px-10 py-5 md:py-6 text-sm md:text-base uppercase tracking-wider font-semibold rounded-xl">
                {t("learnMore")}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section - Outline Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8 sm:mt-12 md:mt-16 py-8 sm:py-12 md:py-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center w-[calc(50%-1rem)] sm:w-auto cursor-pointer transition-all duration-200 ease-out"
              >
                <p
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-tight leading-none mb-2 md:mb-4"
                  style={{
                    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                    WebkitTextStroke: "1.5px #22c55e",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.02em",
                    fontWeight: "700",
                  }}
                >
                  {stat.value}
                  <span style={{ WebkitTextStroke: "1.5px #22c55e" }}>
                    {stat.suffix}
                  </span>
                </p>
                <p className="text-green-600 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">
                  {t(`stats.${stat.labelKey}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
