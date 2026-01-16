import { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import { getCareers } from '@/actions/career';
import { CareerListPage } from '@/components/careers/CareerListPage';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'vi'
      ? 'Tuyển dụng - Cơ hội nghề nghiệp'
      : 'Careers - Job Opportunities';

  const description =
    locale === 'vi'
      ? 'Khám phá các cơ hội việc làm tại NETCO POST. Tham gia đội ngũ của chúng tôi và phát triển sự nghiệp trong ngành logistics.'
      : 'Explore career opportunities at NETCO POST. Join our team and grow your career in the logistics industry.';

  return generateSEO({
    title,
    description,
    locale,
    path: '/careers',
  });
}

export default async function CareersPage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const language = locale === 'vi' ? 'VN' : 'EN';

  const response = await getCareers({
    keylang: language,
  });

  const careers = response?.data || [];

  return (
    <CareerListPage
      careers={Array.isArray(careers) ? careers : []}
      locale={locale}
    />
  );
}
