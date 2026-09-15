"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Field, Lang, SECTIONS, Section, UI } from "@/lib/questionnaire";

type Value = string | number | number[];
type Answers = Record<string, Value | undefined>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isFilled = (v: Value | undefined) =>
  Array.isArray(v) ? v.length > 0 : v !== undefined && v !== "";

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/40";

export default function Questionnaire() {
  const [lang, setLang] = useState<Lang>("fr");
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");

  const t = (x: Record<Lang, string>) => x[lang];

  const setValue = (id: string, value: Value) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setErrors((e) => {
      if (!e[id] && !(id === "phone" || id === "email")) return e;
      const next = { ...e };
      delete next[id];
      if (id === "phone" || id === "email") {
        delete next.phone;
        if (!(id === "phone" && next.email === t(UI.invalidEmail))) delete next.email;
      }
      return next;
    });
  };

  const sectionDone = (sec: Section) => {
    const required = sec.fields.filter((f) => f.required);
    const contact = sec.fields.filter((f) => f.contact);
    if (required.length || contact.length) {
      return (
        required.every((f) => isFilled(answers[f.id])) &&
        (!contact.length || contact.some((f) => isFilled(answers[f.id])))
      );
    }
    return sec.fields.some((f) => isFilled(answers[f.id]));
  };

  const doneCount = useMemo(() => SECTIONS.filter(sectionDone).length, [answers]); // eslint-disable-line react-hooks/exhaustive-deps

  const validate = () => {
    const next: Record<string, string> = {};
    SECTIONS.forEach((s) =>
      s.fields.forEach((f) => {
        if (f.required && !isFilled(answers[f.id])) next[f.id] = t(UI.required);
      })
    );
    const email = String(answers.email ?? "").trim();
    const phone = String(answers.phone ?? "").trim();
    if (!email && !phone) {
      next.phone = t(UI.contactReq);
      next.email = t(UI.contactReq);
    } else if (email && !EMAIL_RE.test(email)) {
      next.email = t(UI.invalidEmail);
    }
    setErrors(next);
    const firstId = SECTIONS.flatMap((s) => s.fields.map((f) => f.id)).find((id) => next[id]);
    if (firstId) {
      document.getElementById(`field-${firstId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      setFormError(t(UI.fixErrors));
      return false;
    }
    setFormError("");
    return true;
  };

  const displayValue = (f: Field): string => {
    const v = answers[f.id];
    if (!isFilled(v)) return "—";
    if (f.type === "select" || f.type === "radio") return t(f.options![v as number]);
    if (f.type === "checks") return (v as number[]).map((i) => t(f.options![i])).join(", ");
    return String(v).trim();
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          website: honeypot,
          contact: {
            name: String(answers.name ?? ""),
            company: String(answers.company ?? ""),
            email: String(answers.email ?? "") || undefined,
            phone: String(answers.phone ?? "") || undefined,
          },
          sections: SECTIONS.map((s) => ({
            title: t(s.title),
            answers: s.fields.map((f) => ({ label: t(f.label), value: displayValue(f) })),
          })),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const renderControl = (f: Field) => {
    const v = answers[f.id];
    const invalid = !!errors[f.id];
    const cls = `${inputClass} ${invalid ? "border-red-500" : ""}`;

    if (f.type === "textarea") {
      return (
        <textarea id={`input-${f.id}`} rows={4} className={cls} placeholder={f.placeholder && t(f.placeholder)}
          value={(v as string) ?? ""} onChange={(e) => setValue(f.id, e.target.value)} aria-invalid={invalid} />
      );
    }
    if (f.type === "select") {
      return (
        <select id={`input-${f.id}`} className={`${cls} [&>option]:bg-neutral-900`} value={v === undefined ? "" : String(v)}
          onChange={(e) => setValue(f.id, e.target.value === "" ? "" : Number(e.target.value))} aria-invalid={invalid}>
          <option value="">{t(UI.select)}</option>
          {f.options!.map((op, i) => (
            <option key={i} value={i}>{t(op)}</option>
          ))}
        </select>
      );
    }
    if (f.type === "radio" || f.type === "checks") {
      const multi = f.type === "checks";
      const selected = multi ? ((v as number[]) ?? []) : [];
      return (
        <div role={multi ? "group" : "radiogroup"} aria-labelledby={`label-${f.id}`} className="flex flex-wrap gap-2">
          {f.options!.map((op, i) => {
            const checked = multi ? selected.includes(i) : v === i;
            return (
              <label key={i} className="relative cursor-pointer">
                <input
                  type={multi ? "checkbox" : "radio"} name={f.id} checked={checked}
                  className="peer absolute inset-0 opacity-0 cursor-pointer"
                  onChange={() => {
                    if (!multi) return setValue(f.id, i);
                    const set = new Set(selected);
                    if (set.has(i)) set.delete(i); else set.add(i);
                    setValue(f.id, [...set].sort((a, b) => a - b));
                  }}
                />
                <span className={`inline-block rounded-full border px-4 py-2 text-sm transition select-none peer-focus-visible:ring-2 peer-focus-visible:ring-green-500/60 ${
                  checked ? "border-green-500 bg-green-500/80 text-black font-semibold" : `border-white/15 bg-white/5 text-white/80 hover:border-green-500/60 ${invalid ? "border-red-500" : ""}`
                }`}>
                  {t(op)}
                </span>
              </label>
            );
          })}
        </div>
      );
    }
    return (
      <input id={`input-${f.id}`} type={f.type} className={cls} placeholder={f.placeholder && t(f.placeholder)}
        autoComplete={f.id === "name" ? "name" : f.type === "email" ? "email" : f.type === "tel" ? "tel" : undefined}
        value={(v as string) ?? ""} onChange={(e) => setValue(f.id, e.target.value)} aria-invalid={invalid} />
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/gd-consulting-logo.png" alt="GD Consulting Logo" width={40} height={40} className="rounded-full" />
            <span className="hidden text-lg font-bold tracking-wide sm:inline">GD Consulting</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-white/70 hover:text-white">{t(UI.back)}</Link>
            <div className="flex overflow-hidden rounded-full border border-white/15" role="group" aria-label="Langue / Language">
              {(["fr", "en"] as Lang[]).map((l) => (
                <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l}
                  className={`px-3 py-1.5 text-sm font-semibold cursor-pointer ${lang === l ? "bg-green-500 text-black" : "text-white/70"}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-12 md:px-8">
        {status === "sent" ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-green-500/30 bg-green-500/5 p-10 text-center">
            <h1 className="mb-4 text-4xl font-extrabold text-green-400">{t(UI.successTitle)}</h1>
            <p className="mb-8 text-lg text-white/80">{t(UI.successText)}</p>
            <Link href="/" className="inline-block rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 font-bold">
              {t(UI.back)}
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-12 max-w-3xl">
              <h1 className="mb-5 text-4xl font-extrabold md:text-6xl">{t(UI.heroTitle)}</h1>
              <p className="text-lg text-white/70 md:text-xl">{t(UI.heroText)}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-[14rem_1fr]">
              <nav aria-label="Sections" className="md:sticky md:top-24 md:self-start">
                <ol className="flex gap-2 overflow-x-auto md:flex-col md:gap-1">
                  {SECTIONS.map((s, i) => {
                    const done = sectionDone(s);
                    return (
                      <li key={s.id}>
                        <a href={`#section-${s.id}`} className={`flex items-center gap-3 py-1.5 text-sm ${done ? "text-white" : "text-white/55"} hover:text-white`}>
                          <span className={`grid h-7 w-7 flex-none place-items-center rounded-full border text-xs font-bold ${done ? "border-green-500 bg-green-500 text-black" : "border-white/20"}`}>
                            {done ? "✓" : i + 1}
                          </span>
                          <span className="hidden md:inline">{t(s.title)}</span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
                <div className="mt-4 h-1 overflow-hidden rounded bg-white/10">
                  <div className="h-full bg-green-500 transition-all" style={{ width: `${(doneCount / SECTIONS.length) * 100}%` }} />
                </div>
                <p className="mt-2 text-xs text-white/50">{doneCount} / {SECTIONS.length} {t(UI.progress)}</p>
              </nav>

              <div>
                {SECTIONS.map((s) => (
                  <section key={s.id} id={`section-${s.id}`} className="mb-6 scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                    <h2 className="text-2xl font-bold">{t(s.title)}</h2>
                    <p className="mb-6 mt-1 text-white/60">{t(s.intro)}</p>
                    <div className="grid gap-5 md:grid-cols-2">
                      {s.fields.map((f) => {
                        const group = f.type === "radio" || f.type === "checks";
                        return (
                          <div key={f.id} id={`field-${f.id}`} className={`flex flex-col gap-2 ${f.full ? "md:col-span-2" : ""}`}>
                            {group ? (
                              <span id={`label-${f.id}`} className="font-semibold">
                                {t(f.label)}{f.required && <span className="ml-1 text-green-400">*</span>}
                              </span>
                            ) : (
                              <label htmlFor={`input-${f.id}`} className="font-semibold">
                                {t(f.label)}{f.required && <span className="ml-1 text-green-400">*</span>}
                              </label>
                            )}
                            {f.hint && <span className="-mt-1 text-sm text-white/50">{t(f.hint)}</span>}
                            {renderControl(f)}
                            {errors[f.id] && <span className="text-sm text-red-400">{errors[f.id]}</span>}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}

                {/* Honeypot field for bots */}
                <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" />

                <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent p-6 md:p-8">
                  <h2 className="text-2xl font-bold">{t(UI.finishTitle)}</h2>
                  <p className="mb-6 mt-1 text-white/70">{t(UI.finishText)}</p>
                  <button type="button" onClick={handleSubmit} disabled={status === "sending"}
                    className={`rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-10 py-4 font-bold shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer ${status === "sending" ? "cursor-not-allowed opacity-70" : ""}`}>
                    {status === "sending" ? t(UI.sending) : t(UI.submit)}
                  </button>
                  <div role="status" aria-live="polite" className="mt-4 text-sm">
                    {formError && <p className="text-red-400">{formError}</p>}
                    {status === "error" && <p className="text-red-400">{t(UI.error)}</p>}
                  </div>
                  <p className="mt-4 text-xs text-white/45">{t(UI.privacy)}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
