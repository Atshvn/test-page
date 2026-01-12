import { Header, Footer } from "@/components/layout";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata = {
  title: "Our Services - Cargon",
  description:
    "Explore our comprehensive freight and logistics services including air, road, ocean, and rail freight.",
};

export default function Services() {
  return (
    <>
      <Header />
      <ServicesPage />
      <Footer />
    </>
  );
}
