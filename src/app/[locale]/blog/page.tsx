import BlogPage from "@/components/pages/BlogPage";
import { getNewsPaginated } from "@/actions/blogs";
import { getTranslations } from "next-intl/server";
import type { NewsItem, NewsPaginationResponse } from "@/types";
import { generateSEO } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  const title = locale === "vi" ? "Tin tức & Blog" : "News & Blog";
  const description =
    locale === "vi"
      ? "Cập nhật tin tức mới nhất về ngành logistics, khuyến mãi và thông tin hữu ích từ NETCO POST."
      : "Latest news about logistics industry, promotions and useful information from NETCO POST.";

  return generateSEO({
    title,
    description,
    locale,
    path: "/blog",
    keywords:
      locale === "vi"
        ? ["tin tức NETCO", "blog logistics", "khuyến mãi giao hàng"]
        : ["NETCO news", "logistics blog", "delivery promotions"],
  });
}

export default async function Blog({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;

  const response = await getNewsPaginated({
    keylang: locale,
    Page: currentPage,
    PageSize: 12,
  });

  const paginationData =
    response.success && response.data
      ? (response.data as NewsPaginationResponse)
      : null;

  const posts: NewsItem[] = paginationData?.data || [];
  const totalPage = paginationData?.totalPage || 1;

  return (
    <BlogPage
      posts={posts}
      locale={locale}
      currentPage={currentPage}
      totalPage={totalPage}
    />
  );
}
