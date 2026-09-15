import { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact | GD Consulting",
  description:
    "Trust your software project to GD Consulting. Get in touch to discuss robust, secure and scalable solutions tailored to your business.",
  alternates: {
    canonical: "https://gdco.tech/en/contact",
    languages: {
      fr: "https://gdco.tech/contact",
      en: "https://gdco.tech/en/contact",
    },
  },
  openGraph: {
    title: "Contact | GD Consulting",
    description: "Get in touch with GD Consulting to discuss your software project.",
    url: "https://gdco.tech/en/contact",
    siteName: "GD Consulting",
    locale: "en_US",
  },
};

export default function ContactPageEn() {
  return (
    <div className="min-h-screen">
      <Contact lang="en" />
    </div>
  );
}
