import { Header, Footer } from "@/components/layout";
import OtherPage from "./OtherPage";

export const metadata = {
  title: "Dịch vụ Khác - NETCO",
  description:
    "Các dịch vụ tùy chỉnh theo nhu cầu riêng của khách hàng, linh hoạt và đa dạng.",
};

export default function Other() {
  return (
    <>
      <Header />
      <OtherPage />
      <Footer />
    </>
  );
}
