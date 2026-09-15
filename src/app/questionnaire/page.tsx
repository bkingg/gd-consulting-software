import { Metadata } from "next";
import Questionnaire from "@/components/Questionnaire";

export const metadata: Metadata = {
  title: "Questionnaire projet site web | GD Consulting",
  description:
    "Décrivez votre projet de site web en 10 minutes : activité, objectifs, contenu et fonctionnalités. GD Consulting revient vers vous sous 48 h.",
  robots: { index: false, follow: true },
};

export default function QuestionnairePage() {
  return <Questionnaire />;
}
