import { Metadata } from "next";
import Questionnaire from "@/components/Questionnaire";

export const metadata: Metadata = {
  title: "Software project questionnaire | GD Consulting",
  description:
    "Tell us about your software project in about 10 minutes: objectives, technical landscape, integrations and timeline. GD Consulting gets back to you within 48h.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://gdco.tech/en/questionnaire",
    languages: {
      fr: "https://gdco.tech/questionnaire",
      en: "https://gdco.tech/en/questionnaire",
    },
  },
};

export default function QuestionnairePageEn() {
  return <Questionnaire initialLang="en" />;
}
