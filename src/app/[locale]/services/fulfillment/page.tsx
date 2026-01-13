import { Header, Footer } from "@/components/layout";
import FulfillmentPage from "./FulfillmentPage";

export const metadata = {
  title: "Dịch vụ Fulfillment - NETCO",
  description:
    "Giải pháp fulfillment toàn diện từ lưu kho, đóng gói đến giao hàng cho khách cuối.",
};

export default function Fulfillment() {
  return (
    <>
      <Header />
      <FulfillmentPage />
      <Footer />
    </>
  );
}
