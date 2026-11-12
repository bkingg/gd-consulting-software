import {
  OfferingIndexPage,
  offeringIndexMetadata,
} from "@/components/offerings/OfferingPages";

export const metadata = offeringIndexMetadata("solutions", "fr");

export default function SolutionsPage() {
  return <OfferingIndexPage collection="solutions" lang="fr" />;
}
