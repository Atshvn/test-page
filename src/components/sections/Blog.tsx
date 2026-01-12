"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Blog() {
  const t = useTranslations("blog");
  const locale = useLocale();
  
  const posts = [
    {
      id: 1,
      title: t("posts.post1.title"),
      excerpt: t("posts.post1.excerpt"),
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: t("posts.post1.category"),
      author: t("posts.post1.author"),
      date: t("posts.post1.date"),
      slug: "tuong-lai-chuoi-cung-ung",
    },
    {
      id: 2,
      title: t("posts.post2.title"),
      excerpt: t("posts.post2.excerpt"),
      image:
        "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: t("posts.post2.category"),
      author: t("posts.post2.author"),
      date: t("posts.post2.date"),
      slug: "quan-ly-kho-hang-hieu-qua",
    },
    {
      id: 3,
      title: t("posts.post3.title"),
      excerpt: t("posts.post3.excerpt"),
      image:
        "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: t("posts.post3.category"),
      author: t("posts.post3.author"),
      date: t("posts.post3.date"),
      slug: "van-chuyen-ben-vung",
    },
  ];

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
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/${locale}/blog/${post.slug}`}>
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl mb-4 md:mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 sm:h-52 md:h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    <span className="bg-green-primary text-white px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-green-dark mb-2 md:mb-3 group-hover:text-green-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
