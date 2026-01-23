"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { COMPANY_INFO } from "@/lib/constants";
import { useRouter } from "@/hooks/useRouter";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");
  const locale = useLocale();
  const router = useRouter();

  // Tracking form state
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingType, setTrackingType] = useState("1"); // 1 = Tracking Code, 2 = DO Code

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      router.push(
        `/${locale}/tracking?code=${encodeURIComponent(trackingCode.trim())}&type=${trackingType}`,
      );
    }
  };

  // Scroll-based animation for the truck
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress to truck position with smooth easing
  // Xe sẽ di chuyển từ nếp gấp thứ 2 (258px) đến form tracking (khoảng 60-70% width)
  // Sử dụng nhiều keyframes để tạo chuyển động mượt hơn
  const truckXRaw = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [258, 450, 650, 850],
  );

  // Apply spring animation for smooth movement
  const truckX = useSpring(truckXRaw, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[auto] lg:min-h-[max(calc(100vh-80px),650px)] w-full overflow-hidden mt-20 bg-gray-50 lg:bg-transparent pb-8 lg:pb-0"
      style={{
        backgroundImage: "var(--hero-bg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center right",
        backgroundSize: "auto 100%",
      }}
    >
      {/* CSS variable for background - hidden on mobile */}
      <style jsx>{`
        section {
          --hero-bg: none;
        }
        @media (min-width: 1024px) {
          section {
            --hero-bg: url(/bg.png);
          }
        }
      `}</style>
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-8 sm:pt-12 lg:pt-6 xl:pt-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Content - Text and Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 max-w-xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-green-dark leading-[1.1] mb-4 sm:mb-6 md:mb-8">
              {t("title.line1")}
              <br />
              {t("title.line2")}
              <br />
              <span className="text-green-primary underline decoration-green-primary underline-offset-4">
                {t("title.line3")}
              </span>
              .
            </h1>

            <p className="text-gray-500 mb-4 sm:mb-6 md:mb-10 lg:mb-6 xl:mb-10 text-base sm:text-lg lg:text-base xl:text-lg">
              {t("subtitle")}
            </p>

            {/* CTA - Get Quote & Call */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 md:mb-12 lg:mb-8 xl:mb-12">
              <Link
                href={`/${locale}/contact`}
                className="text-green-dark font-semibold underline underline-offset-4 hover:text-green-primary transition-colors text-base sm:text-lg"
              >
                {t("getQuote")}
              </Link>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-dark rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <span className="text-gray-500 text-xs sm:text-sm">
                    {t("callUs")}{" "}
                  </span>
                  <span className="font-semibold text-green-primary text-sm sm:text-base">
                    {COMPANY_INFO.hotline}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tracking Box - Bottom Right on desktop, centered on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative lg:absolute lg:bottom-6 xl:bottom-8 lg:right-8 xl:right-16 z-30 w-full px-4 lg:px-0 lg:max-w-md xl:max-w-lg mt-6 lg:mt-0"
      >
        <form
          onSubmit={handleTrackingSubmit}
          className="bg-white p-6 sm:p-6 lg:p-5 xl:p-6 rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto lg:max-w-md xl:max-w-lg lg:mx-0 lg:ml-auto"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center shadow-md">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <h3 className="font-bold text-green-dark text-base sm:text-lg">
              {t("tracking.title")}
            </h3>
          </div>

          {/* Radio Options */}
          <div className="flex flex-wrap gap-5 sm:gap-6 mb-5">
            <label className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
              <input
                type="radio"
                name="trackingType"
                value="1"
                checked={trackingType === "1"}
                onChange={(e) => setTrackingType(e.target.value)}
                className="w-4 h-4 sm:w-4 sm:h-4 accent-green-primary cursor-pointer"
              />
              <span className="text-sm sm:text-sm text-gray-700 font-medium">
                {t("tracking.trackingCode")}
              </span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
              <input
                type="radio"
                name="trackingType"
                value="2"
                checked={trackingType === "2"}
                onChange={(e) => setTrackingType(e.target.value)}
                className="w-4 h-4 sm:w-4 sm:h-4 accent-green-primary cursor-pointer"
              />
              <span className="text-sm sm:text-sm text-gray-700 font-medium">
                {t("tracking.partnerCode")}
              </span>
            </label>
          </div>

          {/* Input and Button */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder={t("tracking.placeholder")}
              className="flex-1 h-11 sm:flex-[2] py-3  focus-visible:ring-green-primary focus-visible:border-green-primary min-w-0"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-green-primary hover:bg-green-dark text-white h-11 sm:h-11 px-6 sm:px-8 rounded-lg uppercase tracking-wide text-[15px] sm:text-sm font-bold w-full sm:w-auto sm:flex-shrink-0 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              {t("tracking.button")}
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Hero Decoration Line - Full Width with Truck Animation */}
      <div
        className=" hero-decoration-wrap absolute left-0 right-0 z-20 hidden lg:block pointer-events-none"
        style={{
          bottom: "50px",
          height: "150px",
          overflow: "visible",
        }}
      >
        {/* SVG Decoration Line - Adjusted to end at tracking form */}
        <svg
          viewBox="0 0 1400 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 w-full"
          preserveAspectRatio="xMinYMin meet"
          style={{
            height: "150px",
            overflow: "visible",
          }}
        >
          {/* Main path - ends at center of tracking form on right */}
          <path
            d="M0 30 L350 30 C365 30 380 40 380 55 L380 85 C380 100 395 110 410 110 L1400 110"
            stroke="#E5E7EB"
            strokeOpacity="0.5"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Active path - highlighted portion where truck travels */}
          <path
            d="M0 30 L350 30 C365 30 380 40 380 55 L380 85 C380 100 395 110 410 110 L1400 110"
            stroke="#10b981"
            strokeOpacity="0.4"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        {/* Truck Icon - moves on scroll from second fold to tracking form center */}
        <motion.div
          className="absolute z-30"
          style={{
            x: truckX,
            y: 0,
            top: "20px",
            left: "0px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Image
              src="/xe-icon.png"
              alt="NETCO Truck"
              width={200}
              height={120}
              className="object-contain drop-shadow-2xl"
              priority
              style={{
                filter: "drop-shadow(0 20px 25px rgb(0 0 0 / 0.15))",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
