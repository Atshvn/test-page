import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { ScrollRestoration } from "@/components/ScrollRestoration";
import { Header, Footer } from "@/components/layout";
import { PageTransition } from "@/components/PageTransition";
import { Toaster } from "@/components/ui/sonner";
import {
  generateSEO,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateLocalBusinessSchema,
} from "@/lib/seo";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const locales = ["vi", "en"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "vi"
      ? "Dịch vụ chuyển phát nhanh - Giao hàng toàn quốc"
      : "Express Delivery Service - Nationwide Shipping";

  const description =
    locale === "vi"
      ? "NETCO POST - Dịch vụ chuyển phát nhanh hàng đầu Việt Nam. Giao hàng an toàn, đúng hẹn với hệ thống theo dõi thời gian thực."
      : "NETCO POST - Leading express delivery service in Vietnam. Safe and on-time delivery with real-time tracking system.";

  return generateSEO({
    title,
    description,
    locale,
    path: "",
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as string)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateLocalBusinessSchema()),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          {/* <ScrollRestoration /> */}
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
          <Toaster position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
