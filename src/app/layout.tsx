import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Netco Post",
  description:
    "We deliver your cargo safely and on time, anywhere in the world. Experience seamless shipping with real-time tracking and dedicated support.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
