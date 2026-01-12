import { Header, Footer } from "@/components/layout";
import TrackingPage from "@/components/pages/TrackingPage";

export const metadata = {
  title: "Track Shipment - Cargon",
  description:
    "Track your shipment in real-time with Cargon's advanced tracking system.",
};

export default function Tracking() {
  return (
    <>
      <Header />
      <TrackingPage />
      <Footer />
    </>
  );
}
