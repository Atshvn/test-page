"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Info, Target, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLink {
  href: string;
  label: string;
  labelVi: string;
  icon: React.ElementType;
}

const sidebarLinks: SidebarLink[] = [
  {
    href: "/about",
    label: "About Us",
    labelVi: "Về chúng tôi",
    icon: Info,
  },
  {
    href: "/vision-mission",
    label: "Vision & Mission",
    labelVi: "Tầm nhìn & Sứ mệnh",
    icon: Target,
  },
  {
    href: "/privacy",
    label: "Privacy Policy",
    labelVi: "Chính sách bảo mật",
    icon: Shield,
  },
];

interface InfoSidebarProps {
  locale?: string;
}

export default function InfoSidebar({ locale = "en" }: InfoSidebarProps) {
  const pathname = usePathname();
  
  // Extract current locale from pathname if not provided
  const currentLocale = locale || (pathname.startsWith("/vi") ? "vi" : "en");

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-green-dark mb-4">
          {currentLocale === "vi" ? "Thông tin" : "Information"}
        </h3>
        <nav className="space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname.includes(link.href);
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={`/${currentLocale}${link.href}`}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  isActive
                    ? "bg-green-primary text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-primary"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">
                  {currentLocale === "vi" ? link.labelVi : link.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
