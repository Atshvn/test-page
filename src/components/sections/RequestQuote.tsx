"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function RequestQuote() {
  const t = useTranslations("requestQuote");

  return (
    <section className="relative overflow-visible bg-green-primary">
      {/* Box Image - Absolute positioned outside container */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        whileHover={{
          scale: 1.15,
          rotateY: 15,
          rotateX: -5,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        className="absolute left-0 top-0 z-20 cursor-pointer hidden lg:block"
        style={{ perspective: "1000px" }}
      >
        <div className="relative w-[450px] h-[450px] xl:w-[500px] xl:h-[500px] -mt-20">
          <Image
            src="/box.png"
            alt={t("images.boxAlt")}
            fill
            className="object-contain drop-shadow-2xl"
            priority
            style={{ transformStyle: "preserve-3d" }}
          />
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8">
          {/* Left Content - Title and Rule Image */}
          <div className="flex flex-col justify-center">
            {/* Box Image - Mobile/Tablet only */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{
                scale: 1.15,
                rotateY: 15,
                rotateX: -5,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="relative z-10 cursor-pointer lg:hidden mb-8"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto">
                <Image
                  src="/box.png"
                  alt={t("images.boxAlt")}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  style={{ transformStyle: "preserve-3d" }}
                />
              </div>
            </motion.div>

            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 lg:mb-12 lg:mt-96"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white  tracking-wider leading-tight">
                {t("sectionTitle")}
              </h2>
            </motion.div>

            {/* Rule/Process Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full"
            >
              <div className="relative w-full h-64 sm:h-80 md:h-96 ">
                <Image
                  src="/rule.png"
                  alt={t("images.ruleAlt")}
                  fill
                  className="object-contain object-center lg:object-left"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Content - Form */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-lg"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12">
                {t("title")}
              </h2>

              <form className="space-y-6 md:space-y-8">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-8">
                  <div>
                    <input
                      type="text"
                      placeholder={t("form.name")}
                      className="w-full bg-transparent border-0 border-b-2 border-white/60 py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-base"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder={t("form.cargoType")}
                      className="w-full bg-transparent border-0 border-b-2 border-white/60 py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-base"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-8">
                  <div>
                    <input
                      type="email"
                      placeholder={t("form.email")}
                      className="w-full bg-transparent border-0 border-b-2 border-white/60 py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-base"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder={t("form.deliveryCity")}
                      className="w-full bg-transparent border-0 border-b-2 border-white/60 py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-base"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-8">
                  <div>
                    <input
                      type="text"
                      placeholder={t("form.departureCity")}
                      className="w-full bg-transparent border-0 border-b-2 border-white/60 py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-base"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder={t("form.weight")}
                      className="w-full bg-transparent border-0 border-b-2 border-white/60 py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-base"
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-8">
                  <div>
                    <input
                      type="tel"
                      placeholder={t("form.phone")}
                      className="w-full bg-transparent border-0 border-b-2 border-white/60 py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-base"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder={t("form.height")}
                      className="w-full bg-transparent border-0 border-b-2 border-white/60 py-3 text-white placeholder-white/80 focus:outline-none focus:border-white text-base"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-white text-green-primary font-bold uppercase tracking-wider py-4 px-12 hover:bg-gray-100 transition-colors text-base rounded-md"
                  >
                    {t("form.submit")}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
