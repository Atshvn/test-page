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
import { Button } from "@/components/ui/button";

export default function RootNotFound() {
  const suggestions = [
    {
      icon: Briefcase,
      label: "Dịch vụ / Services",
      href: "/vi/services",
    },
    {
      icon: Package,
      label: "Tra cứu / Tracking",
      href: "/vi/tracking",
    },
    {
      icon: Phone,
      label: "Liên hệ / Contact",
      href: "/vi/contact",
    },
    {
      icon: Newspaper,
      label: "Tin tức / News",
      href: "/vi/blog",
    },
  ];

  return (
    <main className="h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center py-20 px-4">
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

              {/* Title - Bilingual */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-5xl font-bold text-green-dark mb-4"
              >
                Ối! Trang không tồn tại
                <br />
                <span className="text-2xl md:text-4xl">
                  Oops! Page Not Found
                </span>
              </motion.h2>

              {/* Description - Bilingual */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
              >
                Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên hoặc tạm
                thời không khả dụng.
                <br />
                The page you are looking for might have been removed or is
                temporarily unavailable.
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
                  <Link href="/vi">
                    <Home className="w-5 h-5 mr-2" />
                    Về trang chủ / Go Home
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <Link href="/vi/tracking">
                    <Package className="w-5 h-5 mr-2" />
                    Tra cứu / Track Order
                  </Link>
                </Button>
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
