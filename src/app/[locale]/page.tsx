import { Header, Footer } from "@/components/layout";
import {
  Hero,
  Services,
  About,
  RequestQuote,
  Blog,
  CTA,
} from "@/components/sections";
import AppDownload from "@/components/sections/AppDownload";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <TrustedBy />
        <Stats /> */}
        <Services />
        <About />
        <RequestQuote />
        <Blog />
        <CTA />
      </main>
      <AppDownload />
      <Footer />
    </>
  );
}
