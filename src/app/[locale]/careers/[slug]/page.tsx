import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { getCareerDetail } from '@/actions/career';
import { CareerDetailPage } from '@/components/careers/CareerDetailPage';
import { generateSEO } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug, locale } = await params;

  const language = locale === 'vi' ? 'VN' : 'EN';
  const response = await getCareerDetail({
    keylang: language,
    Url: slug,
  });

  const careerDetail = response?.data;
  
  if (!careerDetail || !Array.isArray(careerDetail) || !careerDetail[0]) {
    return {
      title: locale === 'vi' ? 'Công việc không tồn tại' : 'Job not found',
      description:
        locale === 'vi' ? 'Công việc không tồn tại' : 'Job not found',
    };
  }

  const career = careerDetail[0];
  const title = locale === 'vi' ? career.Title : career.TitleEn || career.Title;
  const description =
    locale === 'vi'
      ? career.CareerDescription
      : career.CareerDescriptionEn || career.CareerDescription;

  return generateSEO({
    title,
    description,
    locale,
    path: `/careers/${slug}`,
  });
}

export default async function CareerDetailPageRoute({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations();
  const language = locale === 'vi' ? 'VN' : 'EN';

  const response = await getCareerDetail({
    keylang: language,
    Url: slug,
  });

  const careerDetail = response?.data;

  if (!careerDetail || !Array.isArray(careerDetail) || !careerDetail[0]) {
    notFound();
  }

  return <CareerDetailPage career={careerDetail[0]} locale={locale} />;
}
