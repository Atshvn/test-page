"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Search, Navigation, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { PostOffice } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { removeVietnameseAccents } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";
import dynamic from "next/dynamic";

// Dynamically import the map component (only on client side)
const PostOfficeMap = dynamic(() => import("@/components/PostOfficeMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Đang tải bản đồ...</p>
      </div>
    </div>
  ),
});

interface PostOfficePageProps {
  postOffices: PostOffice[];
  locale: string;
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function PostOfficePage({
  postOffices,
  locale,
}: PostOfficePageProps) {
  const t = useTranslations("postOffice");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOffice, setSelectedOffice] = useState<PostOffice | null>(null);

  // Filter post offices based on search
  const filteredOffices = useMemo(() => {
    if (!searchQuery) return postOffices;

    const query = removeVietnameseAccents(searchQuery);
    return postOffices.filter(
      (office) =>
        removeVietnameseAccents(office.POName).includes(query) ||
        removeVietnameseAccents(office.POAddress).includes(query),
    );
  }, [postOffices, searchQuery]);

  // Handle office selection
  const handleSelectOffice = (office: PostOffice) => {
    setSelectedOffice(office);
  };

  // Open Google Maps for directions
  const handleGetDirections = (office: PostOffice) => {
    if (office.Lat && office.Lng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${office.Lat},${office.Lng}`;
      window.open(url, "_blank");
    }
  };

  return (
    <main className="pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-12 border-b">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-green-100 text-green-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              {t("badge")}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-dark mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-gray-600 mb-8">{t("description")}</p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 border-gray-200 bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-primary">
                  {postOffices.length}
                </div>
                <div className="text-sm text-gray-600">{t("totalOffices")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-primary">34</div>
                <div className="text-sm text-gray-600">{t("provinces")}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* List Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden h-[calc(100vh-280px)] flex flex-col"
              >
                {/* Header */}
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {t("officeList")}
                    </h2>
                    <span className="text-sm text-gray-500">
                      {filteredOffices.length} {t("offices")}
                    </span>
                  </div>
                </div>

                {/* Office List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredOffices.length > 0 ? (
                    <motion.div
                      key={searchQuery} // Force re-mount when search changes
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                      className="divide-y"
                    >
                      {filteredOffices.map((office) => (
                        <motion.div
                          key={office.PostOfficeID}
                          variants={fadeInUp}
                          className={`p-4 cursor-pointer transition-colors ${
                            selectedOffice?.PostOfficeID === office.PostOfficeID
                              ? "bg-green-50 border-l-4 border-l-green-primary"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() => handleSelectOffice(office)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-5 h-5 text-green-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                                {office.POName}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2 flex items-start gap-1">
                                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                {office.POAddress}
                              </p>
                              {office.POPhone && (
                                <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                                  <Phone className="w-3.5 h-3.5" />
                                  {office.POPhone}
                                </p>
                              )}
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs border-green-primary text-green-primary hover:bg-green-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleGetDirections(office);
                                  }}
                                >
                                  <Navigation className="w-3 h-3 mr-1" />
                                  {t("getDirections")}
                                </Button>
                                {office.POPhone && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.open(`tel:${office.POPhone}`);
                                    }}
                                  >
                                    <Phone className="w-3 h-3 mr-1" />
                                    {t("call")}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-12">
                      <MapPin className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-center">
                        {t("noResults")}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Map Section */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden h-[calc(100vh-280px)]"
              >
                {/* Map Container */}
                <div className="relative h-full">
                  <PostOfficeMap
                    postOffices={filteredOffices}
                    selectedOffice={selectedOffice}
                    onSelectOffice={handleSelectOffice}
                  />

                  {/* Selected Office Card Overlay */}
                  {selectedOffice && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-4 max-w-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {selectedOffice.POName}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2 flex items-start gap-1">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-primary" />
                            {selectedOffice.POAddress}
                          </p>
                          {selectedOffice.POPhone && (
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="w-4 h-4 text-green-primary" />
                              {selectedOffice.POPhone}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedOffice(null)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button
                          className="flex-1 bg-green-primary hover:bg-green-dark text-white"
                          onClick={() => handleGetDirections(selectedOffice)}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          {t("getDirections")}
                        </Button>
                        {selectedOffice.POPhone && (
                          <Button
                            variant="outline"
                            className="border-green-primary text-green-primary hover:bg-green-50"
                            onClick={() =>
                              window.open(`tel:${selectedOffice.POPhone}`)
                            }
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            {t("call")}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-green-primary to-green-700 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-primary hover:bg-gray-100"
                onClick={() => window.open(`tel:${COMPANY_INFO.hotlineTel}`)}
              >
                <Phone className="w-5 h-5 mr-2" />
                {COMPANY_INFO.hotline}
              </Button>
              <Button
                size="lg"
                variant="default"
                className=" bg-red-500 hover:bg-red-600 text-white hover:text-white"
                onClick={() => (window.location.href = `/${locale}/contact`)}
              >
                {t("cta.contact")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
