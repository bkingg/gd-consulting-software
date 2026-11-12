import {
  OfferingIndexPage,
  offeringIndexMetadata,
} from "@/components/offerings/OfferingPages";

export const metadata = offeringIndexMetadata("solutions", "en");

export default function SolutionsPageEn() {
  return <OfferingIndexPage collection="solutions" lang="en" />;
}
