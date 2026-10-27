"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import type { Dictionary } from "@/lib/dictionaries";
import { Locale, paths } from "@/lib/i18n";

type ContactDict = Dictionary["contact"];

// Zod schema for validation, with messages in the page language
const makeSchema = (e: ContactDict["errors"]) =>
  z.object({
    name: z.string().trim().min(2, e.name).max(100, e.nameLong),
    email: z.email(e.email).max(254, e.emailLong),
    message: z.string().trim().min(5, e.message).max(5000, e.messageLong),
  });

const ContactForm = ({
  lang,
  dict,
  imageAlt,
}: {
  lang: Locale;
  dict: ContactDict;
  imageAlt: string;
}) => {
  const contactSchema = useMemo(() => makeSchema(dict.errors), [dict]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

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
      } else if (res.status === 429) {
        alert(dict.errors.rateLimited);
      } else {
        alert(dict.errors.send);
      }
    } catch (err) {
      console.error(err);
      alert(dict.errors.server);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-stretch">
      <div className="relative hidden lg:block min-h-[36rem] overflow-hidden rounded-3xl">
        <Image
          src="/images/developer-laptop.webp"
          alt={imageAlt}
          fill
          sizes="40vw"
          className="object-cover"
        />
      </div>
      <div className="relative text-center lg:text-left">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
        {dict.title}
      </h2>
      <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto lg:mx-0 text-pretty">
        {dict.text}
      </p>

      <p className="text-lg mb-12 max-w-2xl mx-auto lg:mx-0">
        {dict.questionnaireBefore}{" "}
        <Link href={paths.questionnaires(lang)} className="text-green-700 font-semibold underline underline-offset-4 hover:text-green-600">
          {dict.questionnaireLink}
        </Link>{" "}
        {dict.questionnaireAfter}
      </p>

      <form
        className="max-w-2xl mx-auto lg:mx-0 flex flex-col gap-6 text-left"
        onSubmit={handleSubmit}
      >
        {/* Honeypot: hidden from humans, bots tend to fill it */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            name="name"
            maxLength={100}
            placeholder={dict.name}
            aria-label={dict.name}
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
            maxLength={254}
            placeholder={dict.email}
            aria-label={dict.email}
            className="p-4 rounded-xl border border-green-400/30 bg-green-50/10 backdrop-blur-md focus:ring-2 focus:ring-green-500 outline-none transition"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col">
          <textarea
            name="message"
            maxLength={5000}
            placeholder={dict.message}
            aria-label={dict.message}
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
              {dict.sending}
            </>
          ) : (
            dict.submit
          )}
        </button>

        {success && (
          <p className="text-green-700 font-semibold mt-4">
            {dict.success}
          </p>
        )}
      </form>
      </div>
      </div>

      <style jsx>{`
        .loader {
          border-width: 2px;
          border-top-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
