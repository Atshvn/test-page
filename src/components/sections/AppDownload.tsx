"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AppDownload() {
  const t = useTranslations("appDownload");
  
  return (
    <section className="relative bg-gray-800 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left - Mascot */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0"
          >
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <Image
                src="https://mediaimages.vps.vn/Main/2024/072024/14/dowloadapp.png"
                alt={t("imageAlt")}
                fill
                className="object-contain"
                quality={100}
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 320px"
              />
            </div>
          </motion.div>

          {/* Right - App Download Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-right"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
              {t("title")}
            </h2>
            <p className="text-white/80 text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-md mx-auto lg:mx-0 lg:ml-auto">
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 sm:gap-6">
              {/* QR Code */}
              <div className="bg-white p-2 sm:p-3 rounded-xl">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gray-100 flex items-center justify-center">
                  {/* Placeholder QR - replace with actual QR code */}
                  <svg
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
                    viewBox="0 0 100 100"
                  >
                    <rect x="10" y="10" width="25" height="25" fill="#000" />
                    <rect x="65" y="10" width="25" height="25" fill="#000" />
                    <rect x="10" y="65" width="25" height="25" fill="#000" />
                    <rect x="15" y="15" width="15" height="15" fill="#fff" />
                    <rect x="70" y="15" width="15" height="15" fill="#fff" />
                    <rect x="15" y="70" width="15" height="15" fill="#fff" />
                    <rect x="20" y="20" width="5" height="5" fill="#000" />
                    <rect x="75" y="20" width="5" height="5" fill="#000" />
                    <rect x="20" y="75" width="5" height="5" fill="#000" />
                    <rect x="40" y="10" width="5" height="5" fill="#000" />
                    <rect x="50" y="10" width="5" height="5" fill="#000" />
                    <rect x="40" y="20" width="5" height="5" fill="#000" />
                    <rect x="45" y="25" width="5" height="5" fill="#000" />
                    <rect x="55" y="20" width="5" height="5" fill="#000" />
                    <rect x="40" y="40" width="20" height="20" fill="#000" />
                    <rect x="45" y="45" width="10" height="10" fill="#fff" />
                    <rect x="10" y="45" width="5" height="5" fill="#000" />
                    <rect x="20" y="45" width="5" height="5" fill="#000" />
                    <rect x="25" y="50" width="5" height="5" fill="#000" />
                    <rect x="85" y="45" width="5" height="5" fill="#000" />
                    <rect x="75" y="50" width="5" height="5" fill="#000" />
                    <rect x="65" y="65" width="25" height="25" fill="#000" />
                    <rect x="70" y="70" width="15" height="15" fill="#fff" />
                    <rect x="75" y="75" width="5" height="5" fill="#000" />
                  </svg>
                </div>
              </div>

              {/* Store Buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.netco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105"
                >
                  <div className="bg-black rounded-lg px-5 py-3 flex items-center gap-3 min-w-[180px]">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="text-white text-left">
                      <p className="text-[10px] leading-none opacity-80">
                        {t("googlePlay.getItOn")}
                      </p>
                      <p className="text-base font-semibold leading-tight">
                        {t("googlePlay.store")}
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="https://apps.apple.com/app/netco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105"
                >
                  <div className="bg-black rounded-lg px-5 py-3 flex items-center gap-3 min-w-[180px]">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                    </svg>
                    <div className="text-white text-left">
                      <p className="text-[10px] leading-none opacity-80">
                        {t("appStore.downloadOn")}
                      </p>
                      <p className="text-base font-semibold leading-tight">
                        {t("appStore.store")}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Green bottom bar */}
      <div className="h-2 bg-green-primary relative z-10" />
    </section>
  );
}
