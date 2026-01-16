"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { getNewsPaginated } from "@/actions/blogs";
import type { NewsItem, NewsPaginationResponse } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { formatDate } from "@/lib/format";

export default function Blog() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getNewsPaginated({
          keylang: locale,
          Page: 1,
          PageSize: 3,
        });

        if (response.success && response.data) {
          const paginationData = response.data as NewsPaginationResponse;
          setPosts(paginationData.data || []);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [locale]);

  if (loading) {
    return (
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12">
            <span className="inline-block bg-green-100 text-green-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
              {t("badge")}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-green-dark">
              {t("title")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl md:rounded-2xl h-48 sm:h-52 md:h-60 mb-4 md:mb-5"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12"
        >
          <div>
            <span className="inline-block bg-green-100 text-green-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
              {t("badge")}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-green-dark">
              {t("title")}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="flex items-center gap-2 text-green-primary font-medium mt-4 md:mt-0 hover:gap-3 transition-all text-sm md:text-base"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
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
                      alt={locale === "vi" ? post.NewsTitle : post.NewsTitleEn}
                      width={800}
                      height={400}
                      className="w-full h-48 sm:h-52 md:h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {(locale === "vi" ? post.MenuName : post.MenuNameEn) && (
                      <div className="absolute top-3 left-3 md:top-4 md:left-4">
                        <span className="bg-green-primary text-white px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium">
                          {locale === "vi" ? post.MenuName : post.MenuNameEn}
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
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base line-clamp-3">
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
      </div>
    </section>
  );
}
