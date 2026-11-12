import {
  OfferingDetailPage,
  offeringDetailMetadata,
  offeringStaticParams,
} from "@/components/offerings/OfferingPages";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => offeringStaticParams("secteurs");

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return offeringDetailMetadata("secteurs", slug, "en");
}

export default async function SecteursDetailPageEn({ params }: Props) {
  const { slug } = await params;
  return <OfferingDetailPage collection="secteurs" slug={slug} lang="en" />;
}
