import TrackingPage from "@/components/pages/TrackingPage";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "vi" ? "Tra cứu vận đơn" : "Track Shipment";
  const description =
    locale === "vi"
      ? "Tra cứu tình trạng đơn hàng NETCO Post theo thời gian thực. Nhập mã vận đơn để theo dõi hành trình giao hàng."
      : "Track your NETCO Post shipment in real-time. Enter tracking number to follow your delivery journey.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/tracking",
    keywords:
      locale === "vi"
        ? ["tra cứu vận đơn", "theo dõi đơn hàng", "mã vận đơn NETCO"]
        : ["track shipment", "tracking number", "delivery status"],
  });
}

export default function Tracking() {
  return <TrackingPage />;
}
