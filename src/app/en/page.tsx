import { Metadata } from "next";
import HomeContent from "@/components/home/HomeContent";

export const metadata: Metadata = {
  title: "GD Consulting - Enterprise Software Engineering",
  description:
    "GD Consulting designs, builds and runs web-based enterprise applications, web services, ERP systems and high-scale e-commerce platforms, from business requirements to production.",
  keywords: [
    "GD Consulting",
    "Software Engineering",
    "Cloud",
    "Web Services",
    "ERP",
    "E-commerce",
    "Custom Development",
    "Innovation",
  ],
  alternates: {
    canonical: "https://gdco.tech/en",
    languages: {
      fr: "https://gdco.tech",
      en: "https://gdco.tech/en",
    },
  },
  openGraph: {
    title: "GD Consulting",
    description:
      "Powerful, scalable and innovative software solutions for ambitious companies.",
    url: "https://gdco.tech/en",
    siteName: "GD Consulting",
    locale: "en_US",
  },
};

export default function HomePageEn() {
  return <HomeContent lang="en" />;
}
