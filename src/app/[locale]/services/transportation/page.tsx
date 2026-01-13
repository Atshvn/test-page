import { Header, Footer } from "@/components/layout";
import TransportationPage from "./TransportationPage";

export const metadata = {
  title: "Dịch vụ Vận chuyển - NETCO",
  description:
    "Dịch vụ vận chuyển hàng hóa nhanh chóng, an toàn với mạng lưới phủ khắp cả nước.",
};

export default function Transportation() {
  return (
    <>
      <Header />
      <TransportationPage />
      <Footer />
    </>
  );
}
