import {
  Hero,
  Services,
  About,
  RequestQuote,
  TruckLineAnimation,
  Blog,
  CTA,
} from "@/components/sections";
import AppDownload from "@/components/sections/AppDownload";
import { getProvinces } from "@/actions/address";
import { Province } from "@/components/forms/ContactForm2";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { success, data } = await getProvinces();
  const provinces = success && Array.isArray(data) ? (data as Province[]) : [];

  return (
    <>
      <main>
        <Hero />
        {/* <TrustedBy />
        <Stats /> */}
        <Services />
        <About />
        <RequestQuote provinces={provinces} locale={locale} />
        <TruckLineAnimation />
        <Blog />
      </main>
      {/* <CTA /> */}
      <AppDownload />
    </>
  );
}
