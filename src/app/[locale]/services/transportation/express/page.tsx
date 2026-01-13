import { Header, Footer } from "@/components/layout";
import ExpressDeliveryPage from "./ExpressDeliveryPage";

export const metadata = {
  title: "Chuyển phát nhanh - NETCO",
  description:
    "Dịch vụ chuyển phát nhanh hàng đầu Việt Nam với cam kết giao hàng trong ngày hoặc hôm sau. Phù hợp cho các đơn hàng TMĐT, tài liệu quan trọng.",
};

export default function ExpressDelivery() {
  return (
    <>
      <Header />
      <ExpressDeliveryPage />
      <Footer />
    </>
  );
}
