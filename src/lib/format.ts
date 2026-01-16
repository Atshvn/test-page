// Format date helper - supports multiple locales
export function formatDate(
  dateString: string,
  locale: string = "vi",
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const date = new Date(dateString);
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...options,
    };
    const localeCode = locale === "vi" ? "vi-VN" : "en-US";
    return date.toLocaleDateString(localeCode, defaultOptions);
  } catch {
    return dateString;
  }
}

// Format date short (e.g., "Jan 15, 2026" or "15 Th1, 2026")
export function formatDateShort(
  dateString: string,
  locale: string = "vi"
): string {
  return formatDate(dateString, locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Format relative time (e.g., "2 days ago", "3 hours ago")
export function formatRelativeTime(
  dateString: string,
  locale: string = "vi"
): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);

    const isVi = locale === "vi";

    if (diffSeconds < 60) {
      return isVi ? "Vừa xong" : "Just now";
    } else if (diffMinutes < 60) {
      return isVi ? `${diffMinutes} phút trước` : `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return isVi ? `${diffHours} giờ trước` : `${diffHours} hours ago`;
    } else if (diffDays < 7) {
      return isVi ? `${diffDays} ngày trước` : `${diffDays} days ago`;
    } else if (diffWeeks < 4) {
      return isVi ? `${diffWeeks} tuần trước` : `${diffWeeks} weeks ago`;
    } else if (diffMonths < 12) {
      return isVi ? `${diffMonths} tháng trước` : `${diffMonths} months ago`;
    } else {
      return formatDateShort(dateString, locale);
    }
  } catch {
    return dateString;
  }
}

// Calculate reading time (rough estimate: 200 words per minute for Vietnamese, 250 for English)
export function calculateReadingTime(
  text: string,
  locale: string = "vi"
): number {
  const cleanText = text?.replace(/<[^>]*>/g, "") || "";
  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = locale === "vi" ? 200 : 250;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes < 1 ? 1 : minutes;
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

// Strip HTML tags from string
export function stripHtml(html: string): string {
  return html?.replace(/<[^>]*>/g, "") || "";
}

// Generate slug from text
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Format number with locale
export function formatNumber(num: number, locale: string = "vi"): string {
  const localeCode = locale === "vi" ? "vi-VN" : "en-US";
  return new Intl.NumberFormat(localeCode).format(num);
}

// Format currency
export function formatCurrency(
  amount: number,
  currency: string = "VND",
  locale: string = "vi"
): string {
  const localeCode = locale === "vi" ? "vi-VN" : "en-US";
  return new Intl.NumberFormat(localeCode, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Capitalize first letter
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Check if string is empty or whitespace
export function isEmptyString(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0;
}
