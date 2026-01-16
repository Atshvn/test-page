import { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import { ShippingCalculatorForm } from '@/components/shipping-calculator/ShippingCalculatorForm';
import { PageHero, Section, Container } from '@/components/ui/page-sections';
import { BreadcrumbSection, Breadcrumb } from '@/components/ui/breadcrumb';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'vi' ? 'Tính phí vận chuyển' : 'Shipping Calculator';
  const description =
    locale === 'vi'
      ? 'Tính phí vận chuyển NETCO Post nhanh chóng và chính xác. Nhập thông tin gói hàng để nhận báo giá chi tiết.'
      : 'Calculate NETCO Post shipping fees quickly and accurately. Enter package details to receive detailed quotes.';

  return generateSEO({
    title,
    description,
    locale,
    path: '/tracking/calculator',
    keywords:
      locale === 'vi'
        ? ['tính phí vận chuyển', 'báo giá giao hàng', 'phí ship NETCO', 'tính cước phí']
        : ['shipping calculator', 'delivery quote', 'shipping fee', 'freight calculator'],
  });
}

export default async function ShippingCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('calculator');
  const tHeader = await getTranslations('header');

  return (
    <main className="pt-20">
      {/* <BreadcrumbSection>
        <Breadcrumb
          items={[
            { label: tHeader('nav.home'), href: `/${locale}` },
            { label: tHeader('nav.tracking'), href: `/${locale}/tracking` },
            { label: tHeader('submenu.shippingCalculator') },
          ]}
        />
      </BreadcrumbSection> */}

      <PageHero
        badge={t('badge')}
        title={t('title')}
        description={t('subtitle')}
        variant="gradient"
      />

      <Section background="gray" padding="lg">
        <Container size="lg">
          <ShippingCalculatorForm locale={locale} />
        </Container>
      </Section>
    </main>
  );
}
