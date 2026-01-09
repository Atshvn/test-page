"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function RequestQuote() {
  return (
    <section className="relative">
      {/* Top white bar */}
      <div className="h-3 bg-white" />

      {/* Full width green background */}
      <div className="bg-green-primary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 py-6 md:py-8">
            {/* Left Content - Images */}
            <div className="flex flex-col items-center">
              {/* Box Image - Top */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 -mt-4 md:-mt-8">
                  <Image
                    src="/box.png"
                    alt="NETCO Box"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>

              {/* Section Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center py-3 md:py-4"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white uppercase tracking-wider">
                  Cách thức hoạt động
                </h2>
              </motion.div>

              {/* Rule/Process Image - Bottom */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full"
              >
                <div className="relative w-full h-40 sm:h-56 md:h-72 lg:h-80">
                  <Image
                    src="/rule.png"
                    alt="Quy trình hoạt động NETCO"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Content - Form on Green Background */}
            <div className="flex items-start justify-center lg:justify-start pt-6 lg:pt-12">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-12">
                  Yêu cầu báo giá
                </h2>

                <form className="space-y-4 md:space-y-8">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 md:gap-x-12">
                    <div>
                      <input
                        type="text"
                        placeholder="Nhập tên"
                        className="w-full bg-transparent border-0 border-b border-white/60 py-2 md:py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Loại hàng hóa"
                        className="w-full bg-transparent border-0 border-b border-white/60 py-2 md:py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-sm md:text-base"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 md:gap-x-12">
                    <div>
                      <input
                        type="email"
                        placeholder="Nhập email"
                        className="w-full bg-transparent border-0 border-b border-white/60 py-2 md:py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Thành phố giao hàng"
                        className="w-full bg-transparent border-0 border-b border-white/60 py-2 md:py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-sm md:text-base"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 md:gap-x-12">
                    <div>
                      <input
                        type="text"
                        placeholder="Thành phố khởi hành"
                        className="w-full bg-transparent border-0 border-b border-white/60 py-2 md:py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Cân nặng"
                        className="w-full bg-transparent border-0 border-b border-white/60 py-2 md:py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-sm md:text-base"
                      />
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 md:gap-x-12">
                    <div>
                      <input
                        type="tel"
                        placeholder="Nhập số"
                        className="w-full bg-transparent border-0 border-b border-white/60 py-2 md:py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Chiều cao"
                        className="w-full bg-transparent border-0 border-b border-white/60 py-2 md:py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-sm md:text-base"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 md:pt-6">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-white text-green-primary font-bold uppercase tracking-wider py-3 md:py-4 px-8 md:px-12 hover:bg-gray-100 transition-colors text-sm"
                    >
                      Gửi yêu cầu
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
