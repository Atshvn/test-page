import { Header, Footer } from "@/components/layout";
import EconomyDeliveryPage from "./EconomyDeliveryPage";

export const metadata = {
  title: "Chuyển phát tiết kiệm - NETCO",
  description:
    "Giải pháp vận chuyển tối ưu chi phí cho các đơn hàng không gấp. Tiết kiệm đến 30% chi phí so với chuyển phát nhanh.",
};

export default function EconomyDelivery() {
  return (
    <>
      <Header />
      <EconomyDeliveryPage />
      <Footer />
    </>
  );
}
