"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  ArrowLeft,
  Share2,
  Clock,
  Tag,
  ChevronRight,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbSection } from "@/components/ui/breadcrumb";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { ShareButtons, ShareTrigger } from "@/components/ui/share-buttons";
import { useTranslations } from "next-intl";
import type { NewsItem } from "@/types";
import { useState, useEffect } from "react";
import { formatDate, calculateReadingTime } from "@/lib/format";

interface BlogDetailPageProps {
  post: NewsItem;
  relatedPosts: NewsItem[];
  locale: string;
}

// Animation variants
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function BlogDetailPage({
  post,
  relatedPosts,
  locale,
}: BlogDetailPageProps) {
  const t = useTranslations("blogDetail");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Get localized content
  const title = locale === "vi" ? post.NewsTitle : post.NewsTitleEn;
  const description =
    locale === "vi" ? post.NewsDescription : post.NewsDescriptionEn;
  const content = locale === "vi" ? post.NewsContent : post.NewsContentEn;
  const category = locale === "vi" ? post.MenuName : post.MenuNameEn;

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="pt-20 bg-gray-50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-primary z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      {/* Breadcrumb */}
      <BreadcrumbSection>
        <Breadcrumb
          items={[
            { label: t("breadcrumb.home"), href: `/${locale}` },
            { label: t("breadcrumb.blog"), href: `/${locale}/blog` },
            { label: title },
          ]}
        />
      </BreadcrumbSection>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Featured Image */}
              {post.ImageNewsShow && (
                <div className="relative aspect-[16/9] w-full">
                  <ImageWithFallback
                    src={post.ImageNewsShow}
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              {/* Article Header */}
              <div className="p-4 md:p-6 lg:p-10">
                {/* Category & Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {category && (
                    <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      {category}
                    </span>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.CreateOn, locale)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {calculateReadingTime(content, locale)} {t("minRead")}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {title}
                </h1>

                {/* Description */}
                {description && (
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed border-l-4 border-green-primary pl-4 bg-green-50/50 py-3 rounded-r-lg">
                    {description}
                  </p>
                )}

                {/* Divider */}
                <hr className="border-gray-200 mb-8" />

                {/* Article Content */}
                <div
                  className="blog-content overflow-x-hidden"
                  dangerouslySetInnerHTML={{ __html: content || "" }}
                />

                {/* Share Section at bottom */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <ShareTrigger label={t("shareArticle")}>
                      <ShareButtons
                        title={title}
                        description={description}
                        size="md"
                      />
                    </ShareTrigger>
                    <Button
                      asChild
                      variant="outline"
                      className="border-green-primary text-green-primary hover:bg-green-50"
                    >
                      <Link href={`/${locale}/blog`}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t("backToBlog")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Share Card */}
              {/* <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-green-primary" />
                  {t("share")}
                </h3>
                <ShareButtons
                  title={title}
                  description={description}
                  showLabels
                  className="flex-wrap"
                />
              </motion.div> */}

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-sm p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-green-primary" />
                    {t("relatedPosts")}
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.slice(0, 4).map((relatedPost, index) => (
                      <motion.div
                        key={relatedPost.NewsId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        <Link
                          href={`/${locale}/blog/${relatedPost.UrlDetail}`}
                          className="group flex gap-3"
                        >
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={relatedPost.ImageNewsShow || ""}
                              alt={
                                locale === "vi"
                                  ? relatedPost.NewsTitle
                                  : relatedPost.NewsTitleEn
                              }
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-green-primary transition-colors mb-1">
                              {locale === "vi"
                                ? relatedPost.NewsTitle
                                : relatedPost.NewsTitleEn}
                            </h4>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(relatedPost.CreateOn)}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-green-primary to-green-700 rounded-2xl shadow-sm p-6 text-white"
              >
                <h3 className="text-lg font-semibold mb-2">{t("cta.title")}</h3>
                <p className="text-sm text-white/80 mb-4">
                  {t("cta.description")}
                </p>
                <Button
                  asChild
                  className="w-full bg-white text-green-primary hover:bg-gray-100"
                >
                  <Link href={`/${locale}/contact`}>{t("cta.contact")}</Link>
                </Button>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>

      {/* More Related Posts Section (Full Width) */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white border-t">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {t("relatedPosts")}
              </h2>
              <p className="text-gray-600">{t("relatedPostsDescription")}</p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {relatedPosts.slice(0, 3).map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.NewsId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/${locale}/blog/${relatedPost.UrlDetail}`}>
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <ImageWithFallback
                          src={relatedPost.ImageNewsShow || ""}
                          alt={
                            locale === "vi"
                              ? relatedPost.NewsTitle
                              : relatedPost.NewsTitleEn
                          }
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {(locale === "vi"
                          ? relatedPost.MenuName
                          : relatedPost.MenuNameEn) && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-green-primary text-white px-2.5 py-1 rounded-full text-xs font-medium">
                              {locale === "vi"
                                ? relatedPost.MenuName
                                : relatedPost.MenuNameEn}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(relatedPost.CreateOn)}</span>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-green-primary transition-colors line-clamp-2">
                          {locale === "vi"
                            ? relatedPost.NewsTitle
                            : relatedPost.NewsTitleEn}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {locale === "vi"
                            ? relatedPost.NewsDescription
                            : relatedPost.NewsDescriptionEn}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>

            <div className="text-center mt-8">
              <Button
                asChild
                variant="outline"
                className="border-green-primary text-green-primary hover:bg-green-50"
              >
                <Link href={`/${locale}/blog`}>
                  {t("cta.morePosts")}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Styles for blog content */}
      <style jsx global>{`
        .blog-content * {
          max-width: 100%;
          word-wrap: break-word;
          overflow-wrap: break-word;
          font-family: var(--font-inter), Inter, system-ui, -apple-system,
            sans-serif !important;
        }

        .blog-content {
          font-size: 1.0625rem;
          line-height: 1.85;
          color: #374151;
          font-family: var(--font-inter), Inter, system-ui, -apple-system,
            sans-serif !important;
        }

        .blog-content > *:first-child {
          margin-top: 0;
        }

        .blog-content > *:last-child {
          margin-bottom: 0;
        }

        .blog-content h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .blog-content h2 {
          font-size: 1.625rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2.25rem;
          margin-bottom: 0.875rem;
          line-height: 1.35;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .blog-content h3 {
          font-size: 1.375rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .blog-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .blog-content p {
          margin-bottom: 1.25rem;
        }

        .blog-content strong,
        .blog-content b {
          font-weight: 600;
          color: #1f2937;
        }

        .blog-content a {
          color: #059669;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }

        .blog-content a:hover {
          color: #047857;
        }

        .blog-content ul {
          list-style: disc;
          margin: 1.25rem 0;
          padding-left: 1.75rem;
        }

        .blog-content ol {
          list-style: decimal;
          margin: 1.25rem 0;
          padding-left: 1.75rem;
        }

        .blog-content li {
          margin-bottom: 0.625rem;
          padding-left: 0.375rem;
        }

        .blog-content li::marker {
          color: #059669;
        }

        .blog-content li > ul,
        .blog-content li > ol {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .blog-content img {
          border-radius: 0.75rem;
          margin: 1.75rem auto;
          max-width: 100%;
          width: 100%;
          height: auto;
          display: block;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          object-fit: contain;
        }

        .blog-content figure {
          margin: 1.75rem 0;
        }

        .blog-content figcaption {
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.5rem;
          font-style: italic;
        }

        .blog-content blockquote {
          position: relative;
          border-left: 4px solid #059669;
          margin: 1.75rem 0;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(to right, #f0fdf4, transparent);
          border-radius: 0 0.5rem 0.5rem 0;
          font-style: italic;
          color: #4b5563;
        }

        .blog-content blockquote p:last-child {
          margin-bottom: 0;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.75rem 0;
          font-size: 0.9375rem;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: block;
          overflow-x: auto;
          white-space: nowrap;
        }

        .blog-content th,
        .blog-content td {
          border: 1px solid #e5e7eb;
          padding: 0.875rem 1rem;
          text-align: left;
        }

        .blog-content th {
          background: #f9fafb;
          font-weight: 600;
          color: #111827;
        }

        .blog-content tr:nth-child(even) {
          background: #f9fafb;
        }

        .blog-content code {
          background: #f3f4f6;
          color: #d97706;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-family: ui-monospace, monospace;
        }

        .blog-content pre {
          background: #1f2937;
          color: #f9fafb;
          padding: 1.25rem 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.75rem 0;
          font-size: 0.875rem;
          line-height: 1.7;
          max-width: 100%;
          word-wrap: break-word;
          white-space: pre-wrap;
        }

        .blog-content pre code {
          background: transparent;
          color: inherit;
          padding: 0;
          font-size: inherit;
        }

        .blog-content hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
        }

        .blog-content iframe {
          width: 100%;
          max-width: 100%;
          border-radius: 0.75rem;
          margin: 1.75rem 0;
        }

        .blog-content video {
          width: 100%;
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1.75rem 0;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .blog-content {
            font-size: 1rem;
            line-height: 1.75;
          }

          .blog-content h1 {
            font-size: 1.625rem;
          }

          .blog-content h2 {
            font-size: 1.375rem;
          }

          .blog-content h3 {
            font-size: 1.125rem;
          }

          .blog-content ul,
          .blog-content ol {
            padding-left: 1.25rem;
          }

          .blog-content img {
            margin: 1.25rem auto;
            border-radius: 0.5rem;
          }

          .blog-content pre {
            padding: 1rem;
            font-size: 0.8125rem;
            margin: 1.25rem -1rem;
            border-radius: 0;
          }

          .blog-content blockquote {
            padding: 1rem;
            margin: 1.25rem 0;
          }

          .blog-content table {
            font-size: 0.875rem;
            margin: 1.25rem -1rem;
          }

          .blog-content th,
          .blog-content td {
            padding: 0.625rem 0.75rem;
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </main>
  );
}
