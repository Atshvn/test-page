"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Page Hero Section
interface PageHeroProps {
  badge?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "simple";
}

export function PageHero({
  badge,
  title,
  description,
  children,
  className,
  variant = "gradient",
}: PageHeroProps) {
  const bgClasses = {
    default: "bg-white",
    gradient: "bg-gradient-to-br from-green-50 via-white to-green-50",
    simple: "bg-gray-50",
  };

  return (
    <section className={cn("py-16", bgClasses[variant], className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {badge && (
            <span className="inline-block bg-green-100 text-green-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-dark mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-gray-600 mb-8">{description}</p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}

// Section Title
interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionTitle({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionTitleProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("max-w-2xl mb-10", alignClasses[align], className)}
    >
      {badge && (
        <span className="inline-block bg-green-100 text-green-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
        {title}
      </h2>
      {description && <p className="text-gray-600 text-lg">{description}</p>}
    </motion.div>
  );
}

// Container component
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "xl" | "full";
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-3xl",
    default: "max-w-7xl",
    lg: "max-w-screen-xl",
    xl: "max-w-screen-2xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}

// Section wrapper
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray" | "green" | "gradient";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export function Section({
  children,
  className,
  background = "white",
  padding = "lg",
}: SectionProps) {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    green: "bg-green-primary",
    gradient: "bg-gradient-to-br from-green-50 via-white to-green-50",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
    xl: "py-20",
  };

  return (
    <section
      className={cn(bgClasses[background], paddingClasses[padding], className)}
    >
      {children}
    </section>
  );
}

// Loading Skeleton
interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ className, variant = "text" }: SkeletonProps) {
  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200",
        variantClasses[variant],
        className
      )}
    />
  );
}

// Empty State
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("text-center py-12", className)}>
      {icon && (
        <div className="flex justify-center mb-4 text-gray-400">{icon}</div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-4">{description}</p>}
      {action}
    </div>
  );
}

// Page Header
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("text-center space-y-2", className)}
    >
      <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
}
