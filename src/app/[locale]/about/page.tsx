import { Header, Footer } from "@/components/layout";
import AboutPage from "@/components/pages/AboutPage";

export const metadata = {
  title: "About Us - Cargon",
  description:
    "Learn about Cargon's mission, vision, and our commitment to providing world-class logistics solutions.",
};

export default function About() {
  return (
    <>
      <Header />
      <AboutPage />
      <Footer />
    </>
  );
}
