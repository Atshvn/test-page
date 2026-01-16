import PrivacyPage from "@/components/pages/PrivacyPage";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function Privacy({ params }: PageProps) {
  await params;

  return <PrivacyPage />;
}
