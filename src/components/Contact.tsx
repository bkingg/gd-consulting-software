"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Lang, o } from "@/lib/i18n";

const UI = {
  title: o("Votre vision, notre expertise", "Your vision, our expertise"),
  intro: o(
    "Confiez votre projet à des professionnels de confiance. Nous concevons des solutions logicielles robustes, sécurisées et évolutives, adaptées aux besoins de votre entreprise.",
    "Entrust your project to professionals you can rely on. We design robust, secure and scalable software solutions tailored to your business needs."
  ),
  questionnaireLead: o("Un projet logiciel ?", "A software project?"),
  questionnaireLink: o("Remplissez notre questionnaire", "Fill out our questionnaire"),
  questionnaireTail: o("pour recevoir une proposition adaptée.", "to receive a tailored proposal."),
  namePlaceholder: o("Votre nom", "Your name"),
  emailPlaceholder: o("Votre email", "Your email"),
  messagePlaceholder: o("Votre message", "Your message"),
  sending: o("Envoi...", "Sending..."),
  submit: o("Envoyer le message", "Send message"),
  success: o("Message envoyé avec succès !", "Message sent successfully!"),
  sendError: o(
    "Erreur lors de l'envoi. Réessayez plus tard, ou écrivez-nous à contact@gdco.tech.",
    "Something went wrong sending your message. Please try again later, or email contact@gdco.tech."
  ),
  rateLimited: o(
    "Trop de messages envoyés. Réessayez dans quelques minutes.",
    "Too many messages sent. Please try again in a few minutes."
  ),
  nameRequired: o("Le nom est requis", "Name is required"),
  emailInvalid: o("Email invalide", "Invalid email"),
  messageTooShort: o("Le message est trop court", "Message is too short"),
};

const fieldClass =
  "p-4 rounded-xl border border-green-400/30 bg-white focus:ring-2 focus:ring-green-500 outline-none transition";

const ContactForm = ({ lang = "fr" }: { lang?: Lang }) => {
  const t = (x: Record<Lang, string>) => x[lang];

  const contactSchema = z.object({
    name: z.string().trim().min(2, t(UI.nameRequired)).max(100),
    email: z.email(t(UI.emailInvalid)).max(254),
    message: z.string().trim().min(5, t(UI.messageTooShort)).max(5000),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  // When the form was displayed; the API rejects implausibly fast submissions
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);
    setSubmitError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    };

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        fieldErrors[key] ??= issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          website: formData.get("website")?.toString() || "",
          startedAt: startedAt.current,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();
        startedAt.current = Date.now();
      } else {
        setSubmitError(t(res.status === 429 ? UI.rateLimited : UI.sendError));
      }
    } catch (err) {
      console.error(err);
      setSubmitError(t(UI.sendError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 text-gray-900 pt-36 pb-28 px-6 md:px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-semibold mb-6">{t(UI.title)}</h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto">{t(UI.intro)}</p>

      <p className="text-lg mb-12 -mt-6 max-w-2xl mx-auto">
        {t(UI.questionnaireLead)}{" "}
        <Link
          href={lang === "en" ? "/en/questionnaire" : "/questionnaire"}
          className="text-green-700 font-semibold underline underline-offset-4 hover:text-green-600"
        >
          {t(UI.questionnaireLink)}
        </Link>{" "}
        {t(UI.questionnaireTail)}
      </p>

      <form className="max-w-2xl mx-auto flex flex-col gap-6 text-left" onSubmit={handleSubmit} noValidate>
        {/* Honeypot: hidden from people, tempting for bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="flex flex-col">
          <label htmlFor="contact-name" className="sr-only">{t(UI.namePlaceholder)}</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            maxLength={100}
            placeholder={t(UI.namePlaceholder)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClass}
          />
          {errors.name && (
            <span id="contact-name-error" className="text-red-600 text-sm mt-1">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="contact-email" className="sr-only">{t(UI.emailPlaceholder)}</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            placeholder={t(UI.emailPlaceholder)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClass}
          />
          {errors.email && (
            <span id="contact-email-error" className="text-red-600 text-sm mt-1">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="contact-message" className="sr-only">{t(UI.messagePlaceholder)}</label>
          <textarea
            id="contact-message"
            name="message"
            maxLength={5000}
            placeholder={t(UI.messagePlaceholder)}
            rows={6}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={fieldClass}
          />
          {errors.message && (
            <span id="contact-message-error" className="text-red-600 text-sm mt-1">{errors.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg transition-transform duration-300 hover:scale-105 flex justify-center items-center gap-2 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              {t(UI.sending)}
            </>
          ) : (
            t(UI.submit)
          )}
        </button>

        <div aria-live="polite" className="text-center">
          {success && <p className="text-green-700 font-semibold">{t(UI.success)}</p>}
          {submitError && <p className="text-red-600 font-semibold">{submitError}</p>}
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
