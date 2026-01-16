"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUp, Phone, Mail } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();

  // Office locations data
  const offices = [
    {
      city: "HÀ NỘI",
      label: t("headquarters"),
      address:
        "Tầng 8, Khối B, Tòa nhà Sông Đà, đường Phạm Hùng, phường Từ Liêm, Thành phố Hà Nội, Việt Nam",
    },
    {
      city: "ĐÀ NẴNG",
      label: "",
      address: "11 Ký Đồng, Phường Thanh Khê, Thành phố Đà Nẵng, Việt Nam",
    },
    {
      city: "HỒ CHÍ MINH",
      label: "",
      address:
        "Lầu 3, Tòa nhà TLE, 36A Đường Trường Sơn, Phường Tân Sơn Hòa, Thành phố Hồ Chí Minh, Việt Nam",
    },
  ];

  // Hotline data by region
  const hotlines = [
    { region: t("regions.north"), phone: "0981 143 131" },
    { region: t("regions.central"), phone: "0909 012 528" },
    { region: t("regions.south"), phone: "0919 549 738" },
    { region: t("regions.east"), phone: "0945 843 131" },
  ];

  const switchLanguage = (newLocale: string) => {
    if (!pathname) return;

    // Extract the path without locale
    const segments = pathname.split("/").filter(Boolean);
    const pathnameWithoutLocale =
      segments[0] === "vi" || segments[0] === "en"
        ? "/" + segments.slice(1).join("/")
        : pathname;

    // Build new path with new locale
    const newPath = `/${newLocale}${
      pathnameWithoutLocale === "/" ? "" : pathnameWithoutLocale
    }`;

    // Use window.location for a hard navigation to ensure locale change
    window.location.href = newPath;
  };

  return (
    <footer className="bg-green-primary text-white relative overflow-hidden">
      {/* World Map Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cpath fill='%23ffffff' fill-opacity='0.3' d='M200,100 Q250,50 300,80 T400,100 T500,90 T600,110 T700,80 T800,100 T900,90 L900,200 Q850,180 800,200 T700,180 T600,200 T500,180 T400,200 T300,180 T200,200 Z M100,250 Q150,230 200,250 T300,240 T400,260 T500,240 T600,260 L600,350 Q550,330 500,350 T400,330 T300,350 T200,330 T100,350 Z M700,300 Q750,280 800,300 T900,290 T1000,310 L1000,400 Q950,380 900,400 T800,380 T700,400 Z'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <h2 className="text-sm md:text-lg font-bold uppercase tracking-wide mb-3 md:mb-4">
                {t("companyName")}
              </h2>
              <p className="text-white/80 text-xs md:text-sm">
                {t("businessLicense")}
                <br />
                {t("issuedDate")}
              </p>
            </div>

            {/* Office Addresses */}
            <div className="space-y-3 md:space-y-4">
              {offices.map((office) => (
                <div key={office.city}>
                  <h3 className="font-bold text-white text-sm md:text-base">
                    {office.city}{" "}
                    {office.label && (
                      <span className="font-normal">{office.label}</span>
                    )}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm">
                    {office.address}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Support Hotlines */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-sm md:text-lg font-bold uppercase tracking-wide">
              {t("supportHotline")}
            </h2>

            <div className="space-y-2 md:space-y-3">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Email: {COMPANY_INFO.email}</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.hotlineTel}`}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Hotline: {COMPANY_INFO.hotline}</span>
              </a>
            </div>

            {/* Regional Hotlines */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 md:gap-3">
              {hotlines.map((item) => (
                <div key={item.region} className="flex flex-col">
                  <a
                    href={`tel:${item.phone.replace(/\s/g, "")}`}
                    className="text-white font-semibold hover:text-white/80 transition-colors text-sm md:text-base"
                  >
                    {item.phone}
                  </a>
                  <span className="text-white/70 text-xs md:text-sm">
                    {item.region}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white leading-relaxed mb-4 md:mb-6">
                {t("cta.question")}
              </p>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-red-500 bg-red-500 hover:bg-red-600 text-white hover:text-white font-bold uppercase tracking-wide text-sm"
              >
                <Link href={`/${locale}/contact`}>
                  {t("cta.sendPackage")}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Language Selector */}
            <div className="mt-4 md:mt-6 flex items-center gap-2">
              <button
                onClick={() => switchLanguage("vi")}
                className={`flex items-center gap-1 transition-colors text-sm ${
                  locale === "vi"
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <span className="text-base md:text-lg">🇻🇳</span>
                <span>VI</span>
              </button>
              <span className="text-white/50">|</span>
              <button
                onClick={() => switchLanguage("en")}
                className={`flex items-center gap-1 transition-colors text-sm ${
                  locale === "en"
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <span className="text-base md:text-lg">🇬🇧</span>
                <span>EN</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 md:mt-10 pt-6 md:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 md:gap-6">
            {/* Left: Connect Button */}
            <Button
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white bg-transparent hover:bg-white hover:text-green-primary font-bold uppercase text-sm"
            >
              {t("connect")}
            </Button>

            {/* Center: App Store Links */}
            <div className="flex items-center gap-3 md:gap-4">
              <a
                href={COMPANY_INFO.app.android}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <div className="bg-black rounded-lg px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-white">
                    <p className="text-[8px] md:text-[10px] leading-none">
                      GET IT ON
                    </p>
                    <p className="text-xs md:text-sm font-semibold leading-tight">
                      Google Play
                    </p>
                  </div>
                </div>
              </a>

              <a
                href={COMPANY_INFO.app.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <div className="bg-black rounded-lg px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="text-white">
                    <p className="text-[8px] md:text-[10px] leading-none">
                      Download on the
                    </p>
                    <p className="text-xs md:text-sm font-semibold leading-tight">
                      App Store
                    </p>
                  </div>
                </div>
              </a>
            </div>

            {/* Right: Social Media */}
            <div className="flex items-center gap-2 md:gap-3">
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 bg-red-600 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 bg-blue-700 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                <p className="text-white/60 text-xs md:text-sm text-center md:text-left">
                  © {new Date().getFullYear()} {t("copyright")}
                </p>
                <a
                  href="http://online.gov.vn/Home/WebDetails/56503?AspxAutoDetectCookieSupport=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  title="Đã thông báo Bộ Công Thương"
                >
                  <img
                    src="http://online.gov.vn/PublicImages/2015/08/27/11/20150827110756-dathongbao.png"
                    alt="Đã thông báo Bộ Công Thương"
                    className="h-10 md:h-12 w-auto"
                  />
                </a>
              </div>
              <div className="flex gap-4 md:gap-6">
                <Link
                  href={`/${locale}/privacy`}
                  className="text-white/60 hover:text-white text-xs md:text-sm transition-colors"
                >
                  {t("privacy")}
                </Link>
                <Link
                  href={`/${locale}/terms`}
                  className="text-white/60 hover:text-white text-xs md:text-sm transition-colors"
                >
                  {t("terms")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Contact Buttons */}
      <FloatingButtons />
    </footer>
  );
}

// Floating Buttons Component
function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-3 md:right-4 bottom-3 md:bottom-4 flex flex-col gap-2 z-50">
      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      )}

      {/* Facebook Messenger */}
      <a
        href={COMPANY_INFO.social.messenger}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on Messenger"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.27.57l.05 1.78c.04.57.61.94 1.13.71l1.98-.87c.17-.08.36-.1.55-.06.91.25 1.87.38 2.88.38 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm6.07 7.57l-2.96 4.7c-.47.75-1.47.93-2.18.4l-2.36-1.77a.6.6 0 0 0-.72 0l-3.18 2.42c-.43.32-.99-.18-.7-.63l2.96-4.7c.47-.75 1.47-.93 2.18-.4l2.36 1.77a.6.6 0 0 0 .72 0l3.18-2.42c.43-.32.99.18.7.63z" />
        </svg>
      </a>

      {/* Phone */}
      <a
        href={`tel:${COMPANY_INFO.hotlineTel}`}
        className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Call us"
      >
        <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </a>

      {/* Zalo */}
      <a
        href={COMPANY_INFO.social.zalo}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on Zalo"
      >
        <span className="text-white font-bold text-[10px] md:text-xs">
          Zalo
        </span>
      </a>
    </div>
  );
}
