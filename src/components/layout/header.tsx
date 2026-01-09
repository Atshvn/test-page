"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "Trang chủ", href: "/" },
  {
    name: "Dịch vụ",
    href: "/services",
    submenu: [
      { name: "Vận tải hàng không", href: "/services/air-freight" },
      { name: "Vận tải đường bộ", href: "/services/road-freight" },
      { name: "Vận tải đường biển", href: "/services/ocean-freight" },
      { name: "Vận tải đường sắt", href: "/services/rail-freight" },
    ],
  },
  { name: "Giới thiệu", href: "/about" },
  { name: "Tra cứu", href: "/tracking" },
  { name: "Tin tức", href: "/blog" },
  { name: "Liên hệ", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [language, setLanguage] = useState<"vi" | "en">("vi");

  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://mediaimages.vps.vn/Main/2024/072024/14/logonew.png"
              alt="NETCO Logo"
              width={150}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-gray-700 hover:text-green-primary transition-colors font-medium"
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
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-primary transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-gray-700 hover:text-green-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">1900 6463</span>
            </a>
            {/* Language Switcher */}
            <div className="flex items-center">
              <button
                onClick={() => setLanguage("vi")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-l-lg border transition-all ${
                  language === "vi"
                    ? "bg-green-50 border-green-primary"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-4 rounded-sm shadow-sm"
                  viewBox="0 0 30 20"
                >
                  <rect width="30" height="20" fill="#DA251D" />
                  <polygon
                    points="15,4 16.76,9.41 22.5,9.41 17.87,12.59 19.63,18 15,14.82 10.37,18 12.13,12.59 7.5,9.41 13.24,9.41"
                    fill="#FFFF00"
                  />
                </svg>
                <span
                  className={`text-xs font-medium ${
                    language === "vi" ? "text-green-primary" : "text-gray-600"
                  }`}
                >
                  VI
                </span>
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-r-lg border-t border-r border-b transition-all ${
                  language === "en"
                    ? "bg-green-50 border-green-primary"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-4 rounded-sm shadow-sm"
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
                  <path d="M15,0 V20 M0,10 H30" stroke="#FFF" strokeWidth="5" />
                  <path
                    d="M15,0 V20 M0,10 H30"
                    stroke="#C8102E"
                    strokeWidth="3"
                  />
                </svg>
                <span
                  className={`text-xs font-medium ${
                    language === "en" ? "text-green-primary" : "text-gray-600"
                  }`}
                >
                  EN
                </span>
              </button>
            </div>
            <Button className="bg-green-primary hover:bg-green-dark text-white px-6">
              Đăng nhập
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
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
                  <div className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <div
                        key={item.name}
                        className="border-b border-gray-50 pb-2"
                      >
                        <Link
                          href={item.href}
                          className="block py-3 text-lg font-medium text-gray-800 hover:text-green-primary transition-colors"
                          onClick={() => !item.submenu && setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {item.submenu && (
                          <div className="ml-4 flex flex-col gap-1 pb-2">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block py-2 text-gray-600 hover:text-green-primary transition-colors text-base"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.name}
                              </Link>
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
                  <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-600 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Ngôn ngữ
                    </span>
                    <div className="flex items-center">
                      <button
                        onClick={() => setLanguage("vi")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-l-lg border transition-all ${
                          language === "vi"
                            ? "bg-green-primary text-white border-green-primary"
                            : "text-gray-600 hover:bg-gray-100 border-gray-200"
                        }`}
                      >
                        <svg
                          className="w-5 h-3.5 rounded-sm"
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
                        onClick={() => setLanguage("en")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-r-lg border-t border-r border-b transition-all ${
                          language === "en"
                            ? "bg-green-primary text-white border-green-primary"
                            : "text-gray-600 hover:bg-gray-100 border-gray-200"
                        }`}
                      >
                        <svg
                          className="w-5 h-3.5 rounded-sm"
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
                    href="tel:19006463"
                    className="flex items-center gap-3 mb-4 text-gray-700"
                  >
                    <div className="w-10 h-10 bg-green-primary rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Hotline</p>
                      <p className="font-semibold text-green-dark">1900 6463</p>
                    </div>
                  </a>
                  <Button
                    className="w-full bg-green-primary hover:bg-green-dark text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Đăng nhập
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
