"use client";

import { motion } from "framer-motion";
import { Target, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const features = [
  "Mạng lưới vận chuyển phủ khắp 34 tỉnh thành",
  "Hỗ trợ khách hàng và theo dõi đơn hàng 24/7",
  "Giải pháp logistics tùy chỉnh theo nhu cầu",
  "Giá cả cạnh tranh và minh bạch",
  "Đội ngũ nhân viên chuyên nghiệp, giàu kinh nghiệm",
  "Ứng dụng công nghệ hiện đại trong vận hành",
];

const stats = [
  { value: "99", suffix: "%", label: "Client satisfaction" },
  { value: "13", suffix: "", label: "Years of experience" },
  { value: "570", suffix: "", label: "Clients worldwide" },
];

export default function About() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content - Single Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px]">
              <Image
                src="/anh.png"
                alt="NETCO - 23 năm phát triển"
                fill
                className="object-contain rounded-xl"
                priority
              />
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-dark mb-4 md:mb-6 leading-tight">
              Dịch vụ vận chuyển liền mạch kết nối với toàn thế giới.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              Tại NETCO, chúng tôi luôn nỗ lực hướng tới mục tiêu cách mạng hóa
              ngành vận tải và cung cấp dịch vụ vượt trội cho khách hàng. Mục
              tiêu bao quát của chúng tôi là...
            </p>

            {/* Tầm nhìn & Sứ mệnh */}
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-green-primary p-4 md:p-6 rounded-xl">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  Tầm nhìn
                </h3>
                <p className="text-white/90 text-xs md:text-sm">
                  Mang lại sự tăng trưởng bền vững để hướng tới một thế giới tốt
                  đẹp hơn.
                </p>
              </div>
              <div className="bg-green-primary p-4 md:p-6 rounded-xl">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Eye className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  Sứ mệnh
                </h3>
                <p className="text-white/90 text-xs md:text-sm">
                  Hài hòa con người và công nghệ để thúc đẩy sự phát triển của
                  doanh nghiệp tới khắp nơi.
                </p>
              </div>
            </div>

            {/* Features List - Hidden since using Vietnamese version */}
            <div className="grid sm:grid-cols-2 gap-2 md:gap-3 mb-6 md:mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button className="w-full sm:w-auto bg-green-primary hover:bg-green-dark text-white px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg uppercase tracking-wide">
              Tìm hiểu thêm về chúng tôi
            </Button>
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
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight tracking-tight leading-none mb-2 md:mb-4"
                  style={{
                    fontFamily: "Georgia, Times New Roman, serif",
                    WebkitTextStroke: "1px #22c55e",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                  <span style={{ WebkitTextStroke: "1px #22c55e" }}>
                    {stat.suffix}
                  </span>
                </p>
                <p className="text-green-600 text-xs sm:text-sm md:text-base font-normal">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
