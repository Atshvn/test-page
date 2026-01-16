import BlogDetailPage from "@/components/pages/BlogDetailPage";
import { getNewsDetail, getNewsPaginated } from "@/actions/blogs";
import { getTranslations } from "next-intl/server";
import type { NewsItem, NewsPaginationResponse } from "@/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateSEO, generateArticleSchema } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blogDetail" });

  // Fetch post data for metadata
  const response = await getNewsDetail({
    Slug: slug,
  });

  const post =
    response.success && response.data ? (response.data as NewsItem) : null;

  if (!post) {
    return {
      title: `${t("notFound.title")} - NETCO POST`,
    };
  }

  const title = locale === "vi" ? post.NewsTitle : post.NewsTitleEn;
  const description =
    locale === "vi" ? post.NewsDescription : post.NewsDescriptionEn;
  const keywords =
    post.MetaKeywords?.split(",").map((k: string) => k.trim()) || [];

  return generateSEO({
    title,
    description,
    locale,
    path: `/blog/${slug}`,
    keywords,
    image: post.ImageNewsShow,
    type: "article",
    publishedTime: post.CreateOn,
  });
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  // Fetch post detail
  const response = await getNewsDetail({
    Slug: slug,
  });

  const post =
    response.success && response.data ? (response.data as NewsItem) : undefined;

  if (!post) {
    notFound();
  }

  // // Increment view count
  // if (post.NewsId) {
  //   incrementNewsView({ NewsId: post.NewsId });
  // }

  // Fetch related posts (same category or recent posts)
  const relatedResponse = await getNewsPaginated({
    keylang: locale,
    Page: 1,
    PageSize: 4,
  });

  const paginationData =
    relatedResponse.success && relatedResponse.data
      ? (relatedResponse.data as NewsPaginationResponse)
      : null;

  const allRelatedPosts: NewsItem[] = paginationData?.data || [];

  // Filter out current post and limit to 3
  const relatedPosts = allRelatedPosts
    .filter((p) => p.NewsId !== post.NewsId)
    .slice(0, 3);

  // JSON-LD Structured Data for SEO
  const title = locale === "vi" ? post.NewsTitle : post.NewsTitleEn;
  const description =
    locale === "vi" ? post.NewsDescription : post.NewsDescriptionEn;
  const content = locale === "vi" ? post.NewsContent : post.NewsContentEn;

  const jsonLd = generateArticleSchema({
    title,
    description,
    image: post.ImageNewsShow,
    publishedTime: post.CreateOn,
    locale,
    slug,
    content,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailPage post={post} relatedPosts={relatedPosts} locale={locale} />
    </>
  );
}
