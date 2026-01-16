'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Calendar,
  Building2,
  FileText,
  CheckCircle2,
  Gift,
  ArrowLeft,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbSection } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShareButtons, ShareTrigger } from '@/components/ui/share-buttons';
import { ApplicationForm } from './ApplicationForm';
import { formatDate } from '@/lib/format';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

interface CareerDetailPageProps {
  career: any;
  locale: string;
}

export function CareerDetailPage({ career, locale }: CareerDetailPageProps) {
  const t = useTranslations('careers');
  const tHeader = useTranslations('header');

  const title = locale === 'vi' ? career.Title : career.TitleEn || career.Title;
  const description =
    locale === 'vi'
      ? career.Description
      : career.DescriptionEn || career.Description;

  return (
    <main className="pt-20 bg-gray-50">
      {/* Breadcrumb */}
      <BreadcrumbSection>
        <Breadcrumb
          items={[
            { label: tHeader('nav.home'), href: `/${locale}` },
            {
              label: tHeader('submenu.careers'),
              href: `/${locale}/careers`,
            },
            { label: title },
          ]}
        />
      </BreadcrumbSection>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Job Content */}
          <article className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Featured Image */}
              {career.ImageCareer && (
                <div className="relative aspect-[16/9] w-full">
                  <ImageWithFallback
                    src={career.ImageCareer}
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                  />
                  {career.IsHot && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5">
                        🔥 Hot Job
                      </Badge>
                    </div>
                  )}
                </div>
              )}

              {/* Job Header */}
              <div className="p-6 md:p-8 lg:p-10">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {title}
                </h1>

                {/* Job Meta Info Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
                  {career.Workplace && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          {t('location')}
                        </p>
                        <p className="text-gray-900 font-medium">
                          {career.Workplace}
                        </p>
                      </div>
                    </div>
                  )}
                  {career.Salary && (
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-green-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          {t('salary')}
                        </p>
                        <p className="text-gray-900 font-medium">
                          {career.Salary}
                        </p>
                      </div>
                    </div>
                  )}
                  {career.Deadline && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-green-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          {t('deadline')}
                        </p>
                        <p className="text-gray-900 font-medium">
                          {formatDate(career.Deadline, locale)}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-green-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        {locale === 'vi' ? 'Loại hình' : 'Job Type'}
                      </p>
                      <p className="text-gray-900 font-medium">
                        {locale === 'vi' ? 'Toàn thời gian' : 'Full-time'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="mb-8">
                  <Button
                    size="lg"
                    className="w-full md:w-auto bg-green-primary hover:bg-green-700 cursor-pointer"
                    onClick={() => {
                      const formSection = document.getElementById('application-form');
                      formSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    {t('applyNow')}
                  </Button>
                </div>

                {/* Divider */}
                <hr className="border-gray-200 mb-8" />

                {/* Job Description */}
                <div className="space-y-8">
                  {/* Description Section */}
                  <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-primary" />
                      {t('jobDescription')}
                    </h2>
                    <div
                      className="job-content overflow-x-hidden"
                      dangerouslySetInnerHTML={{ __html: description || '' }}
                    />
                  </section>

                  {/* Benefits Section */}
                  <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Gift className="w-5 h-5 text-green-primary" />
                      {t('benefitsTitle')}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <BenefitCard
                        icon="💰"
                        title={t('benefits.competitiveSalary.title')}
                        description={t('benefits.competitiveSalary.description')}
                      />
                      <BenefitCard
                        icon="🏥"
                        title={t('benefits.insurance.title')}
                        description={t('benefits.insurance.description')}
                      />
                      <BenefitCard
                        icon="📚"
                        title={t('benefits.training.title')}
                        description={t('benefits.training.description')}
                      />
                      <BenefitCard
                        icon="🎉"
                        title={t('benefits.environment.title')}
                        description={t('benefits.environment.description')}
                      />
                      <BenefitCard
                        icon="✈️"
                        title={t('benefits.travel.title')}
                        description={t('benefits.travel.description')}
                      />
                      <BenefitCard
                        icon="⏰"
                        title={t('benefits.flexible.title')}
                        description={t('benefits.flexible.description')}
                      />
                    </div>
                  </section>
                </div>

                {/* Share Section */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <ShareTrigger label={t('shareJob')}>
                      <ShareButtons title={title} description={career.CareerDescription} size="md" />
                    </ShareTrigger>
                    <Button
                      asChild
                      variant="outline"
                      className="border-green-primary text-green-primary hover:bg-green-50"
                    >
                      <Link href={`/${locale}/careers`}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {locale === 'vi' ? 'Về trang tuyển dụng' : 'Back to Careers'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div
              id="application-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <ApplicationForm
                careerId={career.HRRecruitmentProposeID || career.CareerId}
                careerTitle={title}
              />
            </motion.div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {locale === 'vi' ? 'Thông tin tóm tắt' : 'Quick Info'}
                </h3>
                <div className="space-y-4">
                  {career.Workplace && (
                    <InfoItem
                      icon={<MapPin className="w-5 h-5 text-green-primary" />}
                      label={t('location')}
                      value={career.Workplace}
                    />
                  )}
                  {career.Salary && (
                    <InfoItem
                      icon={<DollarSign className="w-5 h-5 text-green-primary" />}
                      label={t('salary')}
                      value={career.Salary}
                    />
                  )}
                  {career.Deadline && (
                    <InfoItem
                      icon={<Clock className="w-5 h-5 text-green-primary" />}
                      label={t('deadline')}
                      value={formatDate(career.Deadline, locale)}
                    />
                  )}
                  <InfoItem
                    icon={<Briefcase className="w-5 h-5 text-green-primary" />}
                    label={locale === 'vi' ? 'Loại hình' : 'Job Type'}
                    value={locale === 'vi' ? 'Toàn thời gian' : 'Full-time'}
                  />
                  <InfoItem
                    icon={<Building2 className="w-5 h-5 text-green-primary" />}
                    label={locale === 'vi' ? 'Công ty' : 'Company'}
                    value="NETCO POST"
                  />
                </div>
              </motion.div>

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-green-primary to-green-700 rounded-2xl shadow-sm p-6 text-white"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {locale === 'vi' ? 'Sẵn sàng ứng tuyển?' : 'Ready to Apply?'}
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  {locale === 'vi'
                    ? 'Tham gia đội ngũ của chúng tôi và phát triển sự nghiệp!'
                    : 'Join our team and grow your career!'}
                </p>
                <Button
                  className="w-full bg-white text-green-primary hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    const formSection = document.getElementById('application-form');
                    formSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t('form.submit')}
                </Button>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>

      {/* Styles for job content */}
      <style jsx global>{`
        .job-content * {
          max-width: 100%;
          word-wrap: break-word;
          overflow-wrap: break-word;
          font-family: var(--font-inter), Inter, system-ui, -apple-system,
            sans-serif !important;
        }

        .job-content {
          font-size: 1.0625rem;
          line-height: 1.85;
          color: #374151;
          font-family: var(--font-inter), Inter, system-ui, -apple-system,
            sans-serif !important;
        }

        .job-content > *:first-child {
          margin-top: 0;
        }

        .job-content > *:last-child {
          margin-bottom: 0;
        }

        .job-content h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .job-content h2 {
          font-size: 1.625rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2.25rem;
          margin-bottom: 0.875rem;
          line-height: 1.35;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .job-content h3 {
          font-size: 1.375rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .job-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .job-content p {
          margin-bottom: 1.25rem;
        }

        .job-content strong,
        .job-content b {
          font-weight: 600;
          color: #1f2937;
        }

        .job-content a {
          color: #059669;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }

        .job-content a:hover {
          color: #047857;
        }

        .job-content ul {
          list-style: disc;
          margin: 1.25rem 0;
          padding-left: 1.75rem;
        }

        .job-content ol {
          list-style: decimal;
          margin: 1.25rem 0;
          padding-left: 1.75rem;
        }

        .job-content li {
          margin-bottom: 0.625rem;
          padding-left: 0.375rem;
        }

        .job-content li::marker {
          color: #059669;
        }

        .job-content li > ul,
        .job-content li > ol {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .job-content img {
          border-radius: 0.75rem;
          margin: 1.75rem auto;
          max-width: 100%;
          width: 100%;
          height: auto;
          display: block;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          object-fit: contain;
        }

        .job-content figure {
          margin: 1.75rem 0;
        }

        .job-content figcaption {
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.5rem;
          font-style: italic;
        }

        .job-content blockquote {
          position: relative;
          border-left: 4px solid #059669;
          margin: 1.75rem 0;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(to right, #f0fdf4, transparent);
          border-radius: 0 0.5rem 0.5rem 0;
          font-style: italic;
          color: #4b5563;
        }

        .job-content blockquote p:last-child {
          margin-bottom: 0;
        }

        .job-content table {
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

        .job-content th,
        .job-content td {
          border: 1px solid #e5e7eb;
          padding: 0.875rem 1rem;
          text-align: left;
        }

        .job-content th {
          background: #f9fafb;
          font-weight: 600;
          color: #111827;
        }

        .job-content tr:nth-child(even) {
          background: #f9fafb;
        }

        .job-content code {
          background: #f3f4f6;
          color: #d97706;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-family: ui-monospace, monospace;
        }

        .job-content pre {
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

        .job-content pre code {
          background: transparent;
          color: inherit;
          padding: 0;
          font-size: inherit;
        }

        .job-content hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
        }

        .job-content iframe {
          width: 100%;
          max-width: 100%;
          border-radius: 0.75rem;
          margin: 1.75rem 0;
        }

        .job-content video {
          width: 100%;
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1.75rem 0;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .job-content {
            font-size: 1rem;
            line-height: 1.75;
          }

          .job-content h1 {
            font-size: 1.625rem;
          }

          .job-content h2 {
            font-size: 1.375rem;
          }

          .job-content h3 {
            font-size: 1.125rem;
          }

          .job-content ul,
          .job-content ol {
            padding-left: 1.25rem;
          }

          .job-content img {
            margin: 1.25rem auto;
            border-radius: 0.5rem;
          }

          .job-content pre {
            padding: 1rem;
            font-size: 0.8125rem;
            margin: 1.25rem -1rem;
            border-radius: 0;
          }

          .job-content blockquote {
            padding: 1rem;
            margin: 1.25rem 0;
          }

          .job-content table {
            font-size: 0.875rem;
            margin: 1.25rem -1rem;
          }

          .job-content th,
          .job-content td {
            padding: 0.625rem 0.75rem;
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </main>
  );
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="text-2xl flex-shrink-0">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 mb-0.5">{label}</p>
        <p className="text-gray-900 font-medium break-words">{value}</p>
      </div>
    </div>
  );
}
