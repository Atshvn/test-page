import { Header, Footer } from "@/components/layout";
import InstallationPage from "./InstallationPage";

export const metadata = {
  title: "Dịch vụ Lắp đặt & Bảo dưỡng - NETCO",
  description:
    "Dịch vụ lắp đặt và bảo dưỡng thiết bị, sản phẩm tận nơi với đội ngũ kỹ thuật chuyên nghiệp.",
};

export default function Installation() {
  return (
    <>
      <Header />
      <InstallationPage />
      <Footer />
    </>
  );
}
