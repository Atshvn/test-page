import type { Metadata } from "next";
import { COMPANY_INFO } from "./constants";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://netco.com.vn";

export const SITE_NAME = "NETCO POST";
export const TWITTER_HANDLE = "@netcopost";

// Default SEO config
export const defaultSEO = {
  siteName: SITE_NAME,
  twitterHandle: TWITTER_HANDLE,
  logo: `${BASE_URL}/logo.png`,
};

// Common keywords for the site
export const commonKeywords = {
  vi: [
    "chuyển phát nhanh",
    "giao hàng",
    "vận chuyển",
    "logistics",
    "NETCO",
    "gửi hàng",
    "ship hàng",
    "giao hàng nhanh",
    "vận chuyển hàng hóa",
  ],
  en: [
    "express delivery",
    "shipping",
    "logistics",
    "NETCO",
    "cargo",
    "freight",
    "courier",
    "parcel delivery",
    "Vietnam logistics",
  ],
};

interface GenerateSEOParams {
  title: string;
  description: string;
  locale: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description,
  locale,
  path,
  keywords = [],
  image,
  type = "website",
  publishedTime,
  noIndex = false,
}: GenerateSEOParams): Metadata {
  const canonicalUrl = `${BASE_URL}/${locale}${path}`;
  const ogLocale = locale === "vi" ? "vi_VN" : "en_US";
  const alternateLocale = locale === "vi" ? "en_US" : "vi_VN";

  const allKeywords = [
    ...keywords,
    ...(locale === "vi" ? commonKeywords.vi : commonKeywords.en),
  ];

  return {
    title: `${title} - ${SITE_NAME}`,
    description,
    keywords: allKeywords,
    authors: [{ name: SITE_NAME }],

    // Canonical & Alternates
    alternates: {
      canonical: canonicalUrl,
      languages: {
        vi: `${BASE_URL}/vi${path}`,
        en: `${BASE_URL}/en${path}`,
      },
    },

    // OpenGraph
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [
            {
              url: `${BASE_URL}/og-image.png`,
              width: 1200,
              height: 630,
              alt: SITE_NAME,
            },
          ],
      type,
      locale: ogLocale,
      alternateLocale,
      ...(type === "article" && publishedTime
        ? {
            publishedTime,
            authors: [SITE_NAME],
          }
        : {}),
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [`${BASE_URL}/og-image.png`],
      creator: TWITTER_HANDLE,
    },

    // Robots
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

// JSON-LD Generators
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [
      COMPANY_INFO.social.facebook,
      COMPANY_INFO.social.tiktok,
      COMPANY_INFO.social.youtube,
      COMPANY_INFO.social.linkedin,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY_INFO.hotline,
      contactType: "customer service",
      availableLanguage: ["Vietnamese", "English"],
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/vi/tracking?code={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleSchema({
  title,
  description,
  image,
  publishedTime,
  locale,
  slug,
  content,
}: {
  title: string;
  description: string;
  image?: string;
  publishedTime: string;
  locale: string;
  slug: string;
  content?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image || undefined,
    datePublished: publishedTime,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/blog/${slug}`,
    },
    articleBody: content?.replace(/<[^>]*>/g, "") || description,
  };
}

export function generateServiceSchema({
  name,
  description,
  locale,
  slug,
}: {
  name: string;
  description: string;
  locale: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    url: `${BASE_URL}/${locale}/services/${slug}`,
    areaServed: {
      "@type": "Country",
      name: "Vietnam",
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BASE_URL,
    name: SITE_NAME,
    image: `${BASE_URL}/logo.png`,
    telephone: COMPANY_INFO.hotline,
    email: COMPANY_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address.vi.street,
      addressLocality: COMPANY_INFO.address.vi.city,
      addressCountry: COMPANY_INFO.address.vi.country,
      postalCode: COMPANY_INFO.address.vi.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY_INFO.coordinates.lat,
      longitude: COMPANY_INFO.coordinates.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "17:30",
    },
    priceRange: "$$",
  };
}
