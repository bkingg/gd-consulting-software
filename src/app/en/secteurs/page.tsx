import {
  OfferingIndexPage,
  offeringIndexMetadata,
} from "@/components/offerings/OfferingPages";

export const metadata = offeringIndexMetadata("secteurs", "en");

export default function SecteursPageEn() {
  return <OfferingIndexPage collection="secteurs" lang="en" />;
}
