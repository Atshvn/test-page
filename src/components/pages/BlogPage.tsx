"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: 1,
    title: "The Future of Global Supply Chain Management",
    excerpt:
      "Explore how technology is reshaping the logistics industry and what it means for your business. From AI-powered routing to blockchain tracking.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Industry Trends",
    author: "John Smith",
    date: "Dec 15, 2025",
    slug: "future-of-supply-chain",
    featured: true,
  },
  {
    id: 2,
    title: "5 Tips for Efficient Warehouse Management",
    excerpt:
      "Learn the best practices for optimizing your warehouse operations and reducing costs while improving efficiency.",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Tips & Guides",
    author: "Sarah Johnson",
    date: "Dec 10, 2025",
    slug: "warehouse-management-tips",
  },
  {
    id: 3,
    title: "Sustainable Shipping: Going Green in Logistics",
    excerpt:
      "Discover eco-friendly shipping solutions that benefit both your business and the environment.",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Sustainability",
    author: "Mike Wilson",
    date: "Dec 5, 2025",
    slug: "sustainable-shipping",
  },
  {
    id: 4,
    title: "E-commerce Logistics: Meeting Customer Expectations",
    excerpt:
      "How to adapt your logistics strategy to meet the demands of modern e-commerce customers.",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "E-commerce",
    author: "Emily Brown",
    date: "Nov 28, 2025",
    slug: "ecommerce-logistics",
  },
  {
    id: 5,
    title: "Cross-Border Shipping: Navigating International Trade",
    excerpt:
      "A comprehensive guide to understanding customs, regulations, and best practices for international shipping.",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "International",
    author: "David Lee",
    date: "Nov 20, 2025",
    slug: "cross-border-shipping",
  },
  {
    id: 6,
    title: "Last-Mile Delivery Innovations",
    excerpt:
      "Explore the latest innovations in last-mile delivery, from drones to autonomous vehicles.",
    image:
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Innovation",
    author: "Lisa Chen",
    date: "Nov 15, 2025",
    slug: "last-mile-innovations",
  },
];

const categories = [
  "All",
  "Industry Trends",
  "Tips & Guides",
  "Sustainability",
  "E-commerce",
  "International",
  "Innovation",
];

export default function BlogPage() {
  const featuredPost = posts.find((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-green-100 text-green-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-dark mb-6">
              News & Insights
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay updated with the latest trends, tips, and insights from the
              logistics industry.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-12 h-12 border-gray-200"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="grid lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-2xl overflow-hidden">
                  <div className="relative h-80 lg:h-full">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12">
                    <span className="inline-block bg-green-100 text-green-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-green-dark mb-4 hover:text-green-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative overflow-hidden rounded-2xl mb-5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-green-dark mb-3 group-hover:text-green-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-green-primary text-green-primary hover:bg-green-50"
            >
              Load More Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-green-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/80 mb-8">
              Get the latest logistics news and insights delivered straight to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-white border-0 sm:w-80"
              />
              <Button className="bg-orange-primary hover:bg-orange-600 text-white h-12 px-8">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
