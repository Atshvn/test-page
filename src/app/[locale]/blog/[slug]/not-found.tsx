"use client";

import { motion } from "framer-motion";
import { FileX, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";

export default function BlogNotFound() {
  const t = useTranslations("blogDetail.notFound");
  const locale = useLocale();

  return (
    <main className="pt-20 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <FileX className="w-12 h-12 text-gray-400" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-green-dark mb-4"
          >
            {t("title")}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-lg mb-8"
          >
            {t("description")}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              className="bg-green-primary hover:bg-green-dark text-white"
            >
              <Link href={`/${locale}/blog`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("backButton")}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-green-primary text-green-primary hover:bg-green-50"
            >
              <Link href={`/${locale}`}>
                <Home className="w-4 h-4 mr-2" />
                {locale === "vi" ? "Về trang chủ" : "Go to Home"}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
