import { Header, Footer } from "@/components/layout";
import BlogPage from "@/components/pages/BlogPage";

export const metadata = {
  title: "Blog - Cargon",
  description:
    "Read the latest news, tips, and insights about logistics and supply chain management.",
};

export default function Blog() {
  return (
    <>
      <Header />
      <BlogPage />
      <Footer />
    </>
  );
}
