import { Header, Footer } from "@/components/layout";
import ContactPage from "@/components/pages/ContactPage";

export const metadata = {
  title: "Contact Us - Cargon",
  description:
    "Get in touch with Cargon for all your logistics needs. We're here to help 24/7.",
};

export default function Contact() {
  return (
    <>
      <Header />
      <ContactPage />
      <Footer />
    </>
  );
}
