"use client";

import { motion } from "framer-motion";
import {
  FileQuestion,
  Home,
  ArrowLeft,
  Package,
  Phone,
  Newspaper,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "@/hooks/useRouter";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();
  const router = useRouter();

  const suggestions = [
    {
      icon: Briefcase,
      label: t("suggestions.services"),
      href: `/${locale}/services`,
    },
    {
      icon: Package,
      label: t("suggestions.tracking"),
      href: `/${locale}/tracking`,
    },
    {
      icon: Phone,
      label: t("suggestions.contact"),
      href: `/${locale}/contact`,
    },
    {
      icon: Newspaper,
      label: t("suggestions.blog"),
      href: `/${locale}/blog`,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* 404 Number with Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className="mb-8"
          >
            <div className="relative inline-block">
              {/* Animated 404 */}
              <h1 className="text-[180px] md:text-[240px] font-bold text-green-primary/10 leading-none select-none">
                404
              </h1>

              {/* Icon overlay */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <FileQuestion className="w-16 h-16 text-green-primary" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-5xl font-bold text-green-dark mb-4"
          >
            {t("heading")}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              asChild
              size="lg"
              className="bg-green-primary hover:bg-green-dark text-white"
            >
              <Link href={`/${locale}`}>
                <Home className="w-5 h-5 mr-2" />
                {t("homeButton")}
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => router.back()}
              className="border-green-primary text-green-primary hover:bg-green-50"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t("backButton")}
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <Link href={`/${locale}/tracking`}>
                <Package className="w-5 h-5 mr-2" />
                {t("trackingButton")}
              </Link>
            </Button>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {t("suggestions.title")}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {suggestions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="group flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:border-green-primary hover:bg-green-50 transition-all duration-300"
                    >
                      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-primary transition-colors">
                        <Icon className="w-7 h-7 text-green-primary group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-green-primary transition-colors text-center">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-20 left-10 w-32 h-32 bg-green-primary rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-green-primary rounded-full blur-3xl"
          />
        </motion.div>
      </div>
    </main>
  );
}
