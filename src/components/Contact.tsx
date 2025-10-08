"use client";

import { useState } from "react";
import { z } from "zod";

// Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  message: z.string().min(5, "Le message est trop court"),
});

const ContactForm = () => {
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

    // Validate with Zod
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
        alert("Erreur lors de l'envoi. Réessayez plus tard.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-gray-50 text-gray-900 py-32 px-8 text-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Votre vision, notre expertise
      </h2>
      <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
        Confiez votre projet à des professionnels de confiance. Nous concevons
        des solutions logicielles robustes, sécurisées et évolutives, adaptées
        aux besoins de votre entreprise.
      </p>

      <form
        className="max-w-2xl mx-auto flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
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
            placeholder="Votre email"
            className="p-4 rounded-xl border border-green-400/30 bg-green-50/10 backdrop-blur-md focus:ring-2 focus:ring-green-500 outline-none transition"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col">
          <textarea
            name="message"
            placeholder="Votre message"
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
              Envoi...
            </>
          ) : (
            "Envoyer le message"
          )}
        </button>

        {success && (
          <p className="text-green-500 font-semibold mt-4">
            Message envoyé avec succès !
          </p>
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
