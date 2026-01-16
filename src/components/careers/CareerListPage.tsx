'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { JobCard } from './JobCard';
import { FilterBar, FilterState } from './FilterBar';
import { BreadcrumbSection, Breadcrumb } from '@/components/ui/breadcrumb';
import { PageHero, Section, Container } from '@/components/ui/page-sections';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, Users, TrendingUp, Award } from 'lucide-react';

interface CareerListPageProps {
  careers: any[];
  locale: string;
}

export function CareerListPage({ careers, locale }: CareerListPageProps) {
  const t = useTranslations('careers');
  const tHeader = useTranslations('header');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    location: 'all',
    department: 'all',
  });

  // Filter careers based on current filters
  const filteredCareers = useMemo(() => {
    return careers?.filter((career) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const titleMatch = career.Title?.toLowerCase().includes(searchLower);
        const descMatch = career.CareerDescription?.toLowerCase().includes(
          searchLower
        );
        if (!titleMatch && !descMatch) return false;
      }

      // Location filter
      if (filters.location !== 'all') {
        const workplaceLower = career.Workplace?.toLowerCase() || '';
        if (!workplaceLower.includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      // Department filter - you might need to adjust this based on your data structure
      // if (filters.department !== 'all') {
      //   // Add department filtering logic
      // }

      return true;
    });
  }, [careers, filters]);

  // Count statistics
  const totalPositions = careers?.length || 0;
  const hotJobs = careers?.filter((c) => c.IsHot)?.length || 0;

  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      {/* <BreadcrumbSection>
        <Breadcrumb
          items={[
            { label: tHeader('nav.home'), href: `/${locale}` },
            {
              label: tHeader('submenu.careers'),
              href: `/${locale}/careers`,
            },
          ]}
        />
      </BreadcrumbSection> */}

      {/* Hero Section */}
      <PageHero
        badge={locale === 'vi' ? '🚀 Tuyển dụng' : '🚀 Careers'}
        title={t('title')}
        description={t('subtitle')}
        variant="gradient"
      />

      {/* Stats Section */}
      <Section background="white" padding="sm" className="border-b">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center p-4 rounded-xl bg-green-50"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-primary/10 text-green-primary mb-2 md:mb-3">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {totalPositions}
              </p>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                {locale === 'vi' ? 'Vị trí tuyển dụng' : 'Open Positions'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center p-4 rounded-xl bg-orange-50"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-primary/10 text-orange-primary mb-2 md:mb-3">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {hotJobs}
              </p>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                {t('hotPosition')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center p-4 rounded-xl bg-blue-50"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 text-blue-500 mb-2 md:mb-3">
                <Users className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-gray-900">500+</p>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                {locale === 'vi' ? 'Nhân viên' : 'Employees'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center p-4 rounded-xl bg-purple-50"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-500/10 text-purple-500 mb-2 md:mb-3">
                <Award className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <p className="text-xl md:text-2xl font-bold text-gray-900">10+</p>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                {locale === 'vi' ? 'Năm kinh nghiệm' : 'Years Experience'}
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Jobs Listing Section */}
      <Section background="gray" padding="lg">
        <Container>
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <FilterBar onFilterChange={setFilters} />
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-6"
          >
            <p className="text-sm md:text-base text-gray-600">
              {t('resultsFound', { count: filteredCareers?.length || 0 }).replace(
                '{count}',
                String(filteredCareers?.length || 0)
              )}
            </p>
          </motion.div>

          {/* Job Cards Grid */}
          {filteredCareers && filteredCareers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCareers.map((career, index) => (
                <JobCard key={`${career.CareerId || 'career'}-${index}`} career={career} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white rounded-2xl"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-900 text-lg font-semibold mb-2">
                {t('noResults')}
              </p>
              <p className="text-sm text-gray-600">
                {t('noResultsSubtitle')}
              </p>
            </motion.div>
          )}
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="white" padding="lg">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-green-primary to-green-700 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              {t('notFound.title')}
            </h3>
            <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">
              {t('notFound.description')}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-red-500 text-white hover:bg-red-600"
            >
              <Link href={`/${locale}/contact`}>
                {locale === 'vi' ? 'Liên hệ ngay' : 'Contact Us'}
              </Link>
            </Button>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}
