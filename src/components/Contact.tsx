"use client";

import { useState } from "react";
import { z } from "zod";
import { Lang, o } from "@/lib/i18n";

const UI = {
  title: o("Votre vision, notre expertise", "Your vision, our expertise"),
  intro: o(
    "Confiez votre projet à des professionnels de confiance. Nous concevons des solutions logicielles robustes, sécurisées et évolutives, adaptées aux besoins de votre entreprise.",
    "Entrust your project to professionals you can rely on. We design robust, secure and scalable software solutions tailored to your business needs."
  ),
  questionnaireLead: o("Un projet de site web ?", "A website project?"),
  questionnaireLink: o(
    "Remplissez notre questionnaire",
    "Fill out our questionnaire"
  ),
  questionnaireTail: o(
    "pour recevoir une proposition adaptée.",
    "to receive a tailored proposal."
  ),
  namePlaceholder: o("Votre nom", "Your name"),
  emailPlaceholder: o("Votre email", "Your email"),
  messagePlaceholder: o("Votre message", "Your message"),
  sending: o("Envoi...", "Sending..."),
  submit: o("Envoyer le message", "Send message"),
  success: o("Message envoyé avec succès !", "Message sent successfully!"),
  sendError: o(
    "Erreur lors de l'envoi. Réessayez plus tard.",
    "Something went wrong sending your message. Please try again later."
  ),
  serverError: o("Erreur serveur. Réessayez plus tard.", "Server error. Please try again later."),
  nameRequired: o("Le nom est requis", "Name is required"),
  emailInvalid: o("Email invalide", "Invalid email"),
  messageTooShort: o("Le message est trop court", "Message is too short"),
};

const ContactForm = ({ lang = "fr" }: { lang?: Lang }) => {
  const t = (x: Record<Lang, string>) => x[lang];

  const contactSchema = z.object({
    name: z.string().min(2, t(UI.nameRequired)),
    email: z.string().email(t(UI.emailInvalid)),
    message: z.string().min(5, t(UI.messageTooShort)),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    };

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const flattened = result.error.flatten();
      const fieldErrors: Record<string, string> = {};
      Object.entries(flattened.fieldErrors).forEach(([key, messages]) => {
        if (messages.length > 0) fieldErrors[key] = messages[0];
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();
      } else {
        alert(t(UI.sendError));
      }
    } catch (err) {
      console.error(err);
      alert(t(UI.serverError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 text-gray-900 py-32 px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{t(UI.title)}</h1>
      <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
        {t(UI.intro)}
      </p>

      <p className="text-lg mb-12 -mt-6 max-w-2xl mx-auto">
        {t(UI.questionnaireLead)}{" "}
        <a
          href={lang === "en" ? "/en/questionnaire" : "/questionnaire"}
          className="text-green-600 font-semibold underline underline-offset-4 hover:text-green-500"
        >
          {t(UI.questionnaireLink)}
        </a>{" "}
        {t(UI.questionnaireTail)}
      </p>

      <form
        className="max-w-2xl mx-auto flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <input
            type="text"
            name="name"
            placeholder={t(UI.namePlaceholder)}
            className="p-4 rounded-xl border border-green-400/30 bg-green-50/10 backdrop-blur-md focus:ring-2 focus:ring-green-500 outline-none transition"
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder={t(UI.emailPlaceholder)}
            className="p-4 rounded-xl border border-green-400/30 bg-green-50/10 backdrop-blur-md focus:ring-2 focus:ring-green-500 outline-none transition"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col">
          <textarea
            name="message"
            placeholder={t(UI.messagePlaceholder)}
            rows={6}
            className="p-4 rounded-xl border border-green-400/30 bg-green-50/10 backdrop-blur-md focus:ring-2 focus:ring-green-500 outline-none transition"
          />
          {errors.message && (
            <span className="text-red-500 text-sm mt-1">{errors.message}</span>
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
              <span className="loader border-t-2 border-white rounded-full w-5 h-5 animate-spin"></span>
              {t(UI.sending)}
            </>
          ) : (
            t(UI.submit)
          )}
        </button>

        {success && (
          <p className="text-green-500 font-semibold mt-4">{t(UI.success)}</p>
        )}
      </form>

      <style jsx>{`
        .loader {
          border-width: 2px;
          border-top-color: transparent;
        }
      `}</style>
    </section>
  );
};

export default ContactForm;
