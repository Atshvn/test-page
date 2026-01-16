"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
  className?: string;
  animated?: boolean;
  separator?: React.ReactNode;
}

export function Breadcrumb({
  items,
  showHomeIcon = false,
  className,
  animated = true,
  separator,
}: BreadcrumbProps) {
  const Wrapper = animated ? motion.nav : "nav";
  const animationProps = animated
    ? {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
      }
    : {};

  const SeparatorIcon = separator || (
    <ChevronRight className="w-4 h-4 flex-shrink-0" />
  );

  return (
    <Wrapper
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-2 text-sm text-gray-500 flex-wrap",
        className
      )}
      {...animationProps}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-gray-400" aria-hidden="true">
                {SeparatorIcon}
              </span>
            )}
            {isLast ? (
              <span
                className="text-gray-700 font-medium truncate max-w-[300px]"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : item.href ? (
              <Link
                href={item.href}
                className="hover:text-green-primary transition-colors flex items-center gap-1.5"
              >
                {isFirst && showHomeIcon && <Home className="w-4 h-4" />}
                {item.label}
              </Link>
            ) : (
              <span className="flex items-center gap-1.5">
                {isFirst && showHomeIcon && <Home className="w-4 h-4" />}
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
}

// Breadcrumb container with consistent styling
interface BreadcrumbSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbSection({
  children,
  className,
}: BreadcrumbSectionProps) {
  return (
    <section className={cn("bg-white border-b", className)}>
      <div className="container mx-auto px-4 py-4">{children}</div>
    </section>
  );
}

// Generate JSON-LD schema for breadcrumbs (SEO)
export function generateBreadcrumbJsonLd(
  items: BreadcrumbItem[],
  baseUrl: string = ""
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  };
}

// Hook for creating breadcrumb items easily
export function useBreadcrumbs(
  locale: string,
  items: Array<{ label: string; path?: string }>
): BreadcrumbItem[] {
  return items.map((item) => ({
    label: item.label,
    href: item.path ? `/${locale}${item.path}` : undefined,
  }));
}
