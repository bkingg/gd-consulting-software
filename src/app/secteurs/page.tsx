import {
  OfferingIndexPage,
  offeringIndexMetadata,
} from "@/components/offerings/OfferingPages";

export const metadata = offeringIndexMetadata("secteurs", "fr");

export default function SecteursPage() {
  return <OfferingIndexPage collection="secteurs" lang="fr" />;
}
