import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  message: z.string().trim().min(1).max(5000),
  // Anti-bot fields sent by the form
  website: z.string().optional(), // honeypot, must stay empty
  startedAt: z.number(), // timestamp when the form was displayed
});

// Submissions faster than this are almost certainly bots
const MIN_FILL_TIME_MS = 3000;

// Best-effort in-memory rate limit (per server instance)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const parsed = contactSchema.safeParse(await req.json());

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid fields" }), {
        status: 400,
      });
    }

    const { name, email, message, website, startedAt } = parsed.data;

    // Pretend success for bots so they don't adapt
    if (website || Date.now() - startedAt < MIN_FILL_TIME_MS) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
      });
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // your Gmail address
        pass: process.env.GMAIL_PASS, // Gmail App Password (recommended)
      },
    });

    await transporter.sendMail({
      from: { name, address: email },
      to: "contact@gdco.tech",
      replyTo: email,
      subject: `GD Consulting - Contact Form Submission from ${name}`,
      text: message,
      html: `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p><p>From: ${escapeHtml(name)} (${escapeHtml(email)})</p>`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
