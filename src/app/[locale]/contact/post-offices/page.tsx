import PostOfficePage from "@/components/pages/PostOfficePage";
import { getPostOffices } from "@/actions/setting";
import { getTranslations } from "next-intl/server";
import type { PostOffice } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "postOffice" });

  return {
    title: `${t("title")} - NETCO`,
    description: t("description"),
  };
}

export default async function PostOffices({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch post offices
  const response = await getPostOffices();

  const postOffices: PostOffice[] =
    response.success && response.data
      ? (response.data as PostOffice[])
      : [];

  return <PostOfficePage postOffices={postOffices} locale={locale} />;
}
