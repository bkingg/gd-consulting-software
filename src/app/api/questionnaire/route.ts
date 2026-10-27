import nodemailer from "nodemailer";
import { z } from "zod";
import { escapeHtml, getClientIp, isRateLimited, isTooFast } from "@/lib/antiSpam";

const payloadSchema = z.object({
  lang: z.enum(["fr", "en"]),
  website: z.string().optional(), // honeypot: must stay empty
  startedAt: z.number(), // timestamp when the form was displayed
  contact: z.object({
    name: z.string().trim().min(1).max(200),
    company: z.string().trim().min(1).max(200),
    email: z.string().trim().max(200).optional(),
    phone: z.string().trim().max(50).optional(),
  }),
  sections: z
    .array(
      z.object({
        title: z.string().max(200),
        answers: z.array(z.object({ label: z.string().max(300), value: z.string().max(5000) })).max(30),
      })
    )
    .max(10),
});

// Nobody fills this multi-section form in under 10 seconds
const MIN_FILL_TIME_MS = 10000;

export async function POST(req: Request) {
  try {
    const parsed = payloadSchema.safeParse(await req.json());
    if (!parsed.success) {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }
    const { lang, website, startedAt, contact, sections } = parsed.data;

    // Silently accept bot submissions without sending anything
    if (website || isTooFast(startedAt, MIN_FILL_TIME_MS)) return Response.json({ success: true });

    if (isRateLimited(`questionnaire:${getClientIp(req)}`)) {
      return Response.json({ error: "Too many requests" }, { status: 429 });
    }

    if (!contact.email && !contact.phone) {
      return Response.json({ error: "Missing contact" }, { status: 400 });
    }
    const email = contact.email && z.string().email().safeParse(contact.email).success ? contact.email : undefined;

    const text = sections
      .map((s, i) => `${i + 1}. ${s.title.toUpperCase()}\n` + s.answers.map((a) => `• ${a.label} : ${a.value}`).join("\n"))
      .join("\n\n");

    const html =
      `<h2 style="font-family:Arial,sans-serif">Questionnaire site web — ${escapeHtml(contact.company)}</h2>` +
      sections
        .map(
          (s, i) =>
            `<h3 style="font-family:Arial,sans-serif;color:#059669;margin:24px 0 8px">${i + 1}. ${escapeHtml(s.title)}</h3>` +
            `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">` +
            s.answers
              .map(
                (a) =>
                  `<tr><td style="vertical-align:top;color:#555;width:240px">${escapeHtml(a.label)}</td>` +
                  `<td style="white-space:pre-wrap">${escapeHtml(a.value)}</td></tr>`
              )
              .join("") +
            `</table>`
        )
        .join("") +
      `<p style="font-family:Arial,sans-serif;color:#888;font-size:12px;margin-top:24px">Langue du formulaire : ${lang.toUpperCase()}</p>`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"GD Consulting – Questionnaire" <${process.env.GMAIL_USER}>`,
      to: "contact@gdco.tech",
      replyTo: email,
      subject: `Questionnaire site web – ${contact.company} (${contact.name})`,
      text,
      html,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
