'use client';

import { motion } from 'framer-motion';
import { MapPin, DollarSign, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { formatDate } from '@/lib/format';

interface JobCardProps {
  career: any;
  index?: number;
}

export function JobCard({ career, index = 0 }: JobCardProps) {
  const t = useTranslations();
  const locale = useLocale();

  const title = locale === 'vi' ? career.Title : career.TitleEn || career.Title;
  const description =
    locale === 'vi'
      ? career.CareerDescription
      : career.CareerDescriptionEn || career.CareerDescription;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link href={`/${locale}/careers/${career.Url}`}>
        <div className="h-full bg-white rounded-xl md:rounded-2xl border border-gray-100 md:border-transparent overflow-hidden shadow-sm md:shadow-none hover:shadow-lg transition-all duration-300">
          {/* Image Section */}
          {career.ImageCareer && (
            <div className="relative overflow-hidden">
              <ImageWithFallback
                src={career.ImageCareer}
                alt={title}
                width={800}
                height={400}
                className="w-full h-48 sm:h-56 md:h-60 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {career.IsHot && (
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                  <Badge className="bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium">
                    🔥 Hot
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Content Section */}
          <div className="p-4 md:p-5 flex flex-col h-full">
            {/* Title & Description */}
            <div className="flex-grow mb-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-green-primary transition-colors line-clamp-2">
                {title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-2">
                {description}
              </p>
            </div>

            {/* Meta Information */}
            <div className="space-y-2 mb-4">
              {career.Workplace && (
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-green-primary flex-shrink-0" />
                  <span className="line-clamp-1">{career.Workplace}</span>
                </div>
              )}
              {career.Salary && (
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-green-primary flex-shrink-0" />
                  <span className="line-clamp-1">{career.Salary}</span>
                </div>
              )}
              {career.Deadline && (
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-green-primary flex-shrink-0" />
                  <span className="line-clamp-1">
                    {locale === 'vi' ? 'Hạn: ' : 'Deadline: '}
                    {formatDate(career.Deadline, locale)}
                  </span>
                </div>
              )}
            </div>

            {/* View Details Link */}
            <div className="flex items-center text-green-primary font-medium text-sm group-hover:gap-2 transition-all">
              <span>{locale === 'vi' ? 'Xem chi tiết' : 'View Details'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
