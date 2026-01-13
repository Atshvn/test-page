import { Header, Footer } from "@/components/layout";
import WarehousingPage from "./WarehousingPage";

export const metadata = {
  title: "Dịch vụ Kho bãi & Lưu trữ - NETCO",
  description:
    "Hệ thống kho bãi hiện đại, đáp ứng nhu cầu lưu trữ và quản lý hàng hóa chuyên nghiệp.",
};

export default function Warehousing() {
  return (
    <>
      <Header />
      <WarehousingPage />
      <Footer />
    </>
  );
}
