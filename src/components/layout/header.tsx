"use client";

import { useState, useId, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { COMPANY_INFO } from "@/lib/constants";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeNestedSubmenu, setActiveNestedSubmenu] = useState<string | null>(
    null
  );
  const [mobileExpandedItems, setMobileExpandedItems] = useState<string[]>([]);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();

  // Fix hydration mismatch for Sheet component
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define submenu item type with optional children
  type SubmenuItem = {
    name: string;
    href: string;
    children?: { name: string; href: string }[];
  };

  const navItems: {
    name: string;
    href: string;
    submenu?: SubmenuItem[];
  }[] = [
    { name: t("nav.home"), href: "/" },
    {
      name: t("nav.services"),
      href: "/services",
      submenu: [
        {
          name: t("submenu.transportation"),
          href: "/services/transportation",
          children: [
            {
              name: t("submenu.expressDelivery"),
              href: "/services/transportation/express",
            },
            {
              name: t("submenu.economyDelivery"),
              href: "/services/transportation/economy",
            },
          ],
        },
        { name: t("submenu.fulfillment"), href: "/services/fulfillment" },
        { name: t("submenu.installation"), href: "/services/installation" },
        { name: t("submenu.other"), href: "/services/other" },
      ],
    },
    {
      name: t("nav.about"),
      href: "/about",
      submenu: [
        { name: t("submenu.aboutUs"), href: "/about" },
        { name: t("submenu.visionMission"), href: "/vision-mission" },
       
      ],
    },
    {
      name: t("nav.tracking"),
      href: "/tracking",
      submenu: [
        { name: t("submenu.orderTracking"), href: "/tracking" },
        { name: t("submenu.shippingCalculator"), href: "/tracking/calculator" },
      ],
    },
    { name: t("nav.blog"), href: "/blog" },
    {
      name: t("nav.contact"),
      href: "/contact",
      submenu: [
        { name: t("submenu.contactUs"), href: "/contact" },
        { name: t("submenu.postOfficeSystem"), href: "/contact/post-offices" },
        { name: t("submenu.careers"), href: "/careers" },
      ],
    },
  ];

  const toggleMobileExpand = (itemName: string) => {
    setMobileExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <Image
              src="/logo.png"
              alt="NETCO Logo"
              width={150}
              height={50}
              className="h-10 lg:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={`/${locale}${item.href}`}
                  className="flex items-center gap-1 text-gray-700 hover:text-green-primary transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Submenu */}
                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                    >
                      {item.submenu.map((subItem) => (
                        <div
                          key={subItem.name}
                          className="relative"
                          onMouseEnter={() =>
                            subItem.children &&
                            setActiveNestedSubmenu(subItem.name)
                          }
                          onMouseLeave={() => setActiveNestedSubmenu(null)}
                        >
                          <Link
                            href={`/${locale}${subItem.href}`}
                            className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-primary transition-colors"
                          >
                            {subItem.name}
                            {subItem.children && (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </Link>

                          {/* Nested Submenu (Level 2) */}
                          <AnimatePresence>
                            {subItem.children &&
                              activeNestedSubmenu === subItem.name && (
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  className="absolute top-0 left-full ml-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                                >
                                  {subItem.children.map((childItem) => (
                                    <Link
                                      key={childItem.name}
                                      href={`/${locale}${childItem.href}`}
                                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-primary transition-colors"
                                    >
                                      {childItem.name}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            <a
              href={`tel:${COMPANY_INFO.hotlineTel}`}
              className="flex items-center gap-1.5 text-gray-700 hover:text-green-primary transition-colors"
            >
              <Phone className="w-4 h-4 xl:w-5 xl:h-5" />
              <span className="font-medium text-sm xl:text-base hidden xl:inline">
                {COMPANY_INFO.hotline}
              </span>
              <span className="font-medium text-sm xl:hidden">
                {COMPANY_INFO.hotline}
              </span>
            </a>

            {/* Language Switcher - Compact Design */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                onBlur={() => setTimeout(() => setIsLangOpen(false), 200)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-gray-200 hover:border-green-primary hover:bg-green-50 transition-all"
              >
                {locale === "vi" ? (
                  <>
                    <svg
                      className="w-5 h-4 rounded-sm flex-shrink-0"
                      viewBox="0 0 30 20"
                    >
                      <rect width="30" height="20" fill="#DA251D" />
                      <polygon
                        points="15,4 16.76,9.41 22.5,9.41 17.87,12.59 19.63,18 15,14.82 10.37,18 12.13,12.59 7.5,9.41 13.24,9.41"
                        fill="#FFFF00"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      VI
                    </span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-4 rounded-sm flex-shrink-0"
                      viewBox="0 0 30 20"
                    >
                      <rect width="30" height="20" fill="#012169" />
                      <path
                        d="M0,0 L30,20 M30,0 L0,20"
                        stroke="#FFF"
                        strokeWidth="3"
                      />
                      <path
                        d="M0,0 L30,20 M30,0 L0,20"
                        stroke="#C8102E"
                        strokeWidth="2"
                      />
                      <path
                        d="M15,0 V20 M0,10 H30"
                        stroke="#FFF"
                        strokeWidth="5"
                      />
                      <path
                        d="M15,0 V20 M0,10 H30"
                        stroke="#C8102E"
                        strokeWidth="3"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      EN
                    </span>
                  </>
                )}
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
                  >
                    <button
                      onClick={() => {
                        switchLanguage("vi");
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-green-50 transition-colors ${
                        locale === "vi"
                          ? "bg-green-50 text-green-primary"
                          : "text-gray-700"
                      }`}
                    >
                      <svg className="w-5 h-4 rounded-sm" viewBox="0 0 30 20">
                        <rect width="30" height="20" fill="#DA251D" />
                        <polygon
                          points="15,4 16.76,9.41 22.5,9.41 17.87,12.59 19.63,18 15,14.82 10.37,18 12.13,12.59 7.5,9.41 13.24,9.41"
                          fill="#FFFF00"
                        />
                      </svg>
                      <span className="text-sm font-medium">Tiếng Việt</span>
                    </button>
                    <button
                      onClick={() => {
                        switchLanguage("en");
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-green-50 transition-colors ${
                        locale === "en"
                          ? "bg-green-50 text-green-primary"
                          : "text-gray-700"
                      }`}
                    >
                      <svg className="w-5 h-4 rounded-sm" viewBox="0 0 30 20">
                        <rect width="30" height="20" fill="#012169" />
                        <path
                          d="M0,0 L30,20 M30,0 L0,20"
                          stroke="#FFF"
                          strokeWidth="3"
                        />
                        <path
                          d="M0,0 L30,20 M30,0 L0,20"
                          stroke="#C8102E"
                          strokeWidth="2"
                        />
                        <path
                          d="M15,0 V20 M0,10 H30"
                          stroke="#FFF"
                          strokeWidth="5"
                        />
                        <path
                          d="M15,0 V20 M0,10 H30"
                          stroke="#C8102E"
                          strokeWidth="3"
                        />
                      </svg>
                      <span className="text-sm font-medium">English</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              asChild
              className="bg-green-primary hover:bg-green-dark text-white px-4 xl:px-6 text-sm xl:text-base"
            >
              <a
                href={COMPANY_INFO.customerPortal}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("login")}
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMounted && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-6 border-b border-gray-100">
                    <Image
                      src="https://mediaimages.vps.vn/Main/2024/072024/14/logonew.png"
                      alt="NETCO Logo"
                      width={120}
                      height={40}
                      className="h-10 w-auto"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 overflow-y-auto p-6">
                    <div className="flex flex-col gap-1">
                      {navItems.map((item) => (
                        <div
                          key={item.name}
                          className="border-b border-gray-100 last:border-0"
                        >
                          <Link
                            href={`/${locale}${item.href}`}
                            className="block py-2.5 text-base font-medium text-gray-800 hover:text-green-primary transition-colors"
                            onClick={() => !item.submenu && setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                          {item.submenu && (
                            <div className="ml-3 flex flex-col gap-0.5 pb-2">
                              {item.submenu.map((subItem) => (
                                <div key={subItem.name}>
                                  {subItem.children ? (
                                    <>
                                      <button
                                        onClick={() =>
                                          toggleMobileExpand(subItem.name)
                                        }
                                        className="flex items-center justify-between w-full py-2 text-gray-600 hover:text-green-primary transition-colors text-sm"
                                      >
                                        {subItem.name}
                                        <ChevronDown
                                          className={`w-4 h-4 transition-transform ${
                                            mobileExpandedItems.includes(
                                              subItem.name
                                            )
                                              ? "rotate-180"
                                              : ""
                                          }`}
                                        />
                                      </button>
                                      {mobileExpandedItems.includes(
                                        subItem.name
                                      ) && (
                                        <div className="ml-3 flex flex-col gap-0.5 pb-1">
                                          {subItem.children.map((childItem) => (
                                            <Link
                                              key={childItem.name}
                                              href={`/${locale}${childItem.href}`}
                                              className="block py-1.5 text-gray-500 hover:text-green-primary transition-colors text-sm"
                                              onClick={() => setIsOpen(false)}
                                            >
                                              {childItem.name}
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <Link
                                      href={`/${locale}${subItem.href}`}
                                      className="block py-2 text-gray-600 hover:text-green-primary transition-colors text-sm"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {subItem.name}
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t border-gray-100 bg-gray-50">
                    {/* Language Switcher Mobile */}
                    <div className="mb-4">
                      <label className="text-xs text-gray-500 mb-2 block flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        {t("language")}
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => switchLanguage("vi")}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                            locale === "vi"
                              ? "bg-green-primary text-white border-green-primary"
                              : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"
                          }`}
                        >
                          <svg
                            className="w-5 h-4 rounded-sm"
                            viewBox="0 0 30 20"
                          >
                            <rect width="30" height="20" fill="#DA251D" />
                            <polygon
                              points="15,4 16.76,9.41 22.5,9.41 17.87,12.59 19.63,18 15,14.82 10.37,18 12.13,12.59 7.5,9.41 13.24,9.41"
                              fill="#FFFF00"
                            />
                          </svg>
                          <span className="text-sm font-medium">VI</span>
                        </button>
                        <button
                          onClick={() => switchLanguage("en")}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                            locale === "en"
                              ? "bg-green-primary text-white border-green-primary"
                              : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"
                          }`}
                        >
                          <svg
                            className="w-5 h-4 rounded-sm"
                            viewBox="0 0 30 20"
                          >
                            <rect width="30" height="20" fill="#012169" />
                            <path
                              d="M0,0 L30,20 M30,0 L0,20"
                              stroke="#FFF"
                              strokeWidth="3"
                            />
                            <path
                              d="M0,0 L30,20 M30,0 L0,20"
                              stroke="#C8102E"
                              strokeWidth="2"
                            />
                            <path
                              d="M15,0 V20 M0,10 H30"
                              stroke="#FFF"
                              strokeWidth="5"
                            />
                            <path
                              d="M15,0 V20 M0,10 H30"
                              stroke="#C8102E"
                              strokeWidth="3"
                            />
                          </svg>
                          <span className="text-sm font-medium">EN</span>
                        </button>
                      </div>
                    </div>

                    <a
                      href={`tel:${COMPANY_INFO.hotlineTel}`}
                      className="flex items-center gap-3 mb-4 text-gray-700"
                    >
                      <div className="w-10 h-10 bg-green-primary rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Hotline</p>
                        <p className="font-semibold text-green-dark">
                          {COMPANY_INFO.hotline}
                        </p>
                      </div>
                    </a>
                    <Button
                      asChild
                      className="w-full bg-green-primary hover:bg-green-dark text-white"
                    >
                      <a
                        href={COMPANY_INFO.customerPortal}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                      >
                        {t("login")}
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
          {/* Placeholder for mobile menu button before hydration */}
          {!isMounted && (
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
