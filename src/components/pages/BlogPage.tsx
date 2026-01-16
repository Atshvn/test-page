"use client";

import { motion } from "framer-motion";
import { Calendar, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { PageHero, Section, Container } from "@/components/ui/page-sections";
import { useTranslations } from "next-intl";
import type { NewsItem } from "@/types";
import { formatDate } from "@/lib/format";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogPageProps {
  posts: NewsItem[];
  locale: string;
  currentPage: number;
  totalPage: number;
}

export default function BlogPage({
  posts,
  locale,
  currentPage,
  totalPage,
}: BlogPageProps) {
  const t = useTranslations("blog");
  const router = useRouter();
  const pathname = usePathname();

  // Handle page change
  const handlePageChange = (page: number) => {
    const url = `${pathname}?page=${page}`;
    router.push(url);
  };

  // Get featured post (first one with IsFeatured or first post)
  const featuredPost = posts.find((post) => post.IsFeatured) || posts[0];
  const regularPosts = posts.filter(
    (post) => post.NewsId !== featuredPost?.NewsId
  );
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPage > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis-start");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPage - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPage - 2) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      pages.push(totalPage);
    }

    return pages;
  };

  // Extract unique categories from posts
  const categories = [
    "All",
    ...Array.from(
      new Set(
        posts
          .map((post) => (locale === "vi" ? post.MenuName : post.MenuNameEn))
          .filter(Boolean)
      )
    ),
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <PageHero
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
        variant="gradient"
      >
        {/* Search */}
        {/* <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="pl-12 h-12 border-gray-200"
            />
          </div>
        </div> */}
      </PageHero>

      {/* Categories */}
      {/* <Section background="white" padding="sm" className="border-b">
        <Container>
          <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex md:flex-wrap md:justify-center gap-2 md:gap-3 min-w-max md:min-w-0">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                    category === "All"
                      ? "bg-green-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </Section> */}

      {/* Featured Post */}
      {featuredPost && (
        <Section background="white" padding="md">
          <Container>
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href={`/${locale}/blog/${featuredPost.UrlDetail}`}>
                <div className="grid lg:grid-cols-2 gap-0 lg:gap-8 items-center bg-gray-50 rounded-xl lg:rounded-2xl overflow-hidden">
                  <div className="relative h-64 sm:h-80 lg:h-full">
                    <ImageWithFallback
                      src={featuredPost.ImageNewsShow || ""}
                      alt={
                        locale === "vi"
                          ? featuredPost.NewsTitle
                          : featuredPost.NewsTitleEn
                      }
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 md:top-4 md:left-4">
                      <span className="bg-orange-primary text-white px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium">
                        {t("featured")}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 lg:p-12">
                    {(locale === "vi"
                      ? featuredPost.MenuName
                      : featuredPost.MenuNameEn) && (
                      <span className="inline-block bg-green-100 text-green-primary px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
                        {locale === "vi"
                          ? featuredPost.MenuName
                          : featuredPost.MenuNameEn}
                      </span>
                    )}
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-dark mb-3 md:mb-4 hover:text-green-primary transition-colors line-clamp-2 lg:line-clamp-none">
                      {locale === "vi"
                        ? featuredPost.NewsTitle
                        : featuredPost.NewsTitleEn}
                    </h2>
                    <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg line-clamp-2 md:line-clamp-3">
                      {locale === "vi"
                        ? featuredPost.NewsDescription
                        : featuredPost.NewsDescriptionEn}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(featuredPost.CreateOn, locale)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          </Container>
        </Section>
      )}

      {/* Blog Grid */}
      <Section background="white" padding="md">
        <Container>
          {regularPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.NewsId}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/${locale}/blog/${post.UrlDetail}`}>
                    <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 md:border-transparent overflow-hidden shadow-sm md:shadow-none hover:shadow-lg transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <ImageWithFallback
                          src={post.ImageNewsShow || ""}
                          alt={
                            locale === "vi" ? post.NewsTitle : post.NewsTitleEn
                          }
                          width={800}
                          height={400}
                          className="w-full h-48 sm:h-56 md:h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {(locale === "vi"
                          ? post.MenuName
                          : post.MenuNameEn) && (
                          <div className="absolute top-3 left-3 md:top-4 md:left-4">
                            <span className="bg-green-primary text-white px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium">
                              {locale === "vi"
                                ? post.MenuName
                                : post.MenuNameEn}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 md:p-5">
                        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span>{formatDate(post.CreateOn, locale)}</span>
                          </div>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-green-dark mb-2 md:mb-3 group-hover:text-green-primary transition-colors line-clamp-2">
                          {locale === "vi" ? post.NewsTitle : post.NewsTitleEn}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3">
                          {locale === "vi"
                            ? post.NewsDescription
                            : post.NewsDescriptionEn}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t("noPosts")}</p>
            </div>
          )}

          {/* Pagination */}
          {totalPage > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={`${pathname}?page=${currentPage - 1}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    >
                      <span className="hidden sm:inline">
                        {t("pagination.previous")}
                      </span>
                    </PaginationPrevious>
                  </PaginationItem>

                  {getPageNumbers().map((pageNum, index) => {
                    if (
                      pageNum === "ellipsis-start" ||
                      pageNum === "ellipsis-end"
                    ) {
                      return (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href={`${pathname}?page=${pageNum}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNum as number);
                          }}
                          isActive={currentPage === pageNum}
                          className={
                            currentPage === pageNum
                              ? "bg-green-primary text-white hover:bg-green-600 hover:text-white"
                              : ""
                          }
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href={`${pathname}?page=${currentPage + 1}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPage)
                          handlePageChange(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPage
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    >
                      <span className="hidden sm:inline">
                        {t("pagination.next")}
                      </span>
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Container>
      </Section>

      {/* Newsletter */}
      {/* <Section background="green" padding="xl">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              {t("newsletter.title")}
            </h2>
            <p className="text-sm md:text-base text-white/80 mb-6 md:mb-8">
              {t("newsletter.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="h-11 md:h-12 bg-white border-0 sm:w-80"
              />
              <Button className="bg-orange-primary hover:bg-orange-600 text-white h-11 md:h-12 px-6 md:px-8">
                {t("newsletter.button")}
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section> */}
    </main>
  );
}
