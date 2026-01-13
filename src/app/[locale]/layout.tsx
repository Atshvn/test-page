import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { ScrollRestoration } from "@/components/ScrollRestoration";
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

  return {
    title: "Netco Post",
    description:
      locale === "vi"
        ? "Chúng tôi giao hàng an toàn và đúng hẹn, đến mọi nơi trên thế giới. Trải nghiệm vận chuyển liền mạch với theo dõi thời gian thực."
        : "We deliver your cargo safely and on time, anywhere in the world. Experience seamless shipping with real-time tracking and dedicated support.",
    keywords: [
      "logistics",
      "freight",
      "shipping",
      "cargo",
      "air freight",
      "ocean freight",
      "road freight",
    ],
  };
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
        <NextIntlClientProvider messages={messages}>
          <ScrollRestoration />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
