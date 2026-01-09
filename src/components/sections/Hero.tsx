"use client";

import { motion } from "framer-motion";
import { Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Circle - Top Right */}
      <div className="absolute -top-20 -right-20 sm:-top-32 sm:-right-32 w-64 h-64 sm:w-96 sm:h-96 bg-green-primary rounded-full opacity-90 z-0" />
      <div className="absolute -top-12 -right-12 sm:-top-20 sm:-right-20 w-48 h-48 sm:w-72 sm:h-72 bg-green-600 rounded-full z-0" />

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 sm:pt-28 lg:pt-40 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 max-w-xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-green-dark leading-[1.1] mb-4 sm:mb-6 md:mb-8">
              Nâng tầm
              <br />
              ngành
              <br />
              <span className="text-green-primary underline decoration-green-primary underline-offset-4">
                Logistics
              </span>
              .
            </h1>

            <p className="text-gray-500 mb-4 sm:mb-6 md:mb-10 text-sm sm:text-base md:text-lg">
              Chúng tôi thiết lập tiêu chuẩn trong vận chuyển hàng hóa từ điểm A
              đến điểm B.
            </p>

            {/* CTA - Get Quote & Call */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mb-6 md:mb-12">
              <Link
                href="/contact"
                className="text-green-dark font-semibold underline underline-offset-4 hover:text-green-primary transition-colors text-base sm:text-lg"
              >
                Nhận báo giá
              </Link>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-dark rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <span className="text-gray-500 text-xs sm:text-sm">
                    Hãy gọi cho chúng tôi:{" "}
                  </span>
                  <span className="font-semibold text-green-primary text-sm sm:text-base">
                    1900 6463
                  </span>
                </div>
              </div>
            </div>

            {/* Tracking Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 max-w-lg"
            >
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <Search className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <h3 className="font-semibold text-green-dark text-sm sm:text-base">
                  Theo dõi (các) lô hàng của bạn
                </h3>
              </div>

              {/* Radio Options */}
              <div className="flex flex-wrap gap-3 sm:gap-6 mb-3 sm:mb-4">
                <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="trackingType"
                    defaultChecked
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 accent-green-primary"
                  />
                  <span className="text-xs sm:text-sm text-gray-600">
                    Mã vận đơn.
                  </span>
                </label>
                <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="trackingType"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 accent-green-primary"
                  />
                  <span className="text-xs sm:text-sm text-gray-600">
                    Mã DO (Đối tác)
                  </span>
                </label>
              </div>

              {/* Input and Button */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Input
                  type="text"
                  placeholder="Nhập mã vận đơn..."
                  className="flex-1 h-10 sm:h-12 border-gray-300 text-xs sm:text-sm"
                />
                <Button className="bg-green-primary hover:bg-green-dark text-white h-10 sm:h-12 px-4 sm:px-6 md:px-8 uppercase tracking-wide text-xs sm:text-sm font-semibold w-full sm:w-auto">
                  Theo dõi
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Truck Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute right-0 top-24 w-[60%] h-[600px] hidden lg:block z-10"
          >
            <Image
              src="/xe.png"
              alt="NETCO Truck"
              fill
              className="object-contain object-right"
              priority
            />
          </motion.div>

          {/* Mobile Truck Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:hidden mt-6"
          >
            <Image
              src="/xe.png"
              alt="NETCO Truck"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Green Curved Wave - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-24 md:h-auto"
          preserveAspectRatio="none"
        >
          <path d="M0 80 Q360 0 720 60 T1440 40 V120 H0 Z" fill="#10b981" />
        </svg>
      </div>
    </section>
  );
}
