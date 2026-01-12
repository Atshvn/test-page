import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
export const locales = ["vi", "en"] as const;
export const defaultLocale = "vi" as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const locale = (await requestLocale) || defaultLocale;

  // Ensure that a valid locale is used
  if (!locales.includes(locale as Locale)) {
    return {
      locale: defaultLocale,
      messages: (await import(`./locales/${defaultLocale}.json`)).default,
    };
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
