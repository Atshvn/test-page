"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Link2, Mail, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  variant?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  className?: string;
}

export function ShareButtons({
  url,
  title = "",
  description = "",
  variant = "horizontal",
  size = "md",
  showLabels = false,
  className,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Get current URL if not provided
  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-10 h-10",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const handleShare = (platform: string) => {
    const emailBody = `${description}\n\n${shareUrl}\n\n---\n${COMPANY_INFO.name}\nHotline: ${COMPANY_INFO.hotline}\nEmail: ${COMPANY_INFO.email}\nWebsite: ${COMPANY_INFO.website}`;
    
    const urls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      email: `mailto:?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(emailBody)}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const buttons = [
    {
      id: "facebook",
      icon: Facebook,
      label: "Facebook",
      bgClass: "bg-blue-600 hover:bg-blue-700",
      onClick: () => handleShare("facebook"),
    },
    {
      id: "twitter",
      icon: Twitter,
      label: "Twitter",
      bgClass: "bg-sky-500 hover:bg-sky-600",
      onClick: () => handleShare("twitter"),
    },
    {
      id: "linkedin",
      icon: Linkedin,
      label: "LinkedIn",
      bgClass: "bg-blue-700 hover:bg-blue-800",
      onClick: () => handleShare("linkedin"),
    },
    {
      id: "email",
      icon: Mail,
      label: "Email",
      bgClass: "bg-gray-600 hover:bg-gray-700",
      onClick: () => handleShare("email"),
    },
    {
      id: "copy",
      icon: Link2,
      label: copied ? "Copied!" : "Copy Link",
      bgClass: copied
        ? "bg-green-600 hover:bg-green-700"
        : "bg-gray-500 hover:bg-gray-600",
      onClick: handleCopyLink,
    },
  ];

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        variant === "vertical" && "flex-col",
        className
      )}
    >
      {buttons.map((button) => (
        <motion.button
          key={button.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={button.onClick}
          className={cn(
            "text-white flex items-center justify-center gap-2 transition-colors",
            sizeClasses[size],
            button.bgClass,
            showLabels ? "px-4 rounded-lg" : "rounded-full"
          )}
          title={button.label}
        >
          <button.icon className={iconSizes[size]} />
          {showLabels && (
            <span className="text-sm font-medium">{button.label}</span>
          )}
        </motion.button>
      ))}
    </div>
  );
}

// Simple share trigger with label
interface ShareTriggerProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export function ShareTrigger({
  label,
  children,
  className,
}: ShareTriggerProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {label && (
        <span className="text-gray-600 font-medium flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          {label}:
        </span>
      )}
      {children}
    </div>
  );
}
