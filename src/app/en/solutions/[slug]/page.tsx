import {
  OfferingDetailPage,
  offeringDetailMetadata,
  offeringStaticParams,
} from "@/components/offerings/OfferingPages";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => offeringStaticParams("solutions");

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return offeringDetailMetadata("solutions", slug, "en");
}

export default async function SolutionsDetailPageEn({ params }: Props) {
  const { slug } = await params;
  return <OfferingDetailPage collection="solutions" slug={slug} lang="en" />;
}
