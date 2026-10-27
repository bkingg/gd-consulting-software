import nodemailer from "nodemailer";
import { z } from "zod";
import { escapeHtml, getClientIp, isRateLimited, isTooFast } from "@/lib/antiSpam";

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
    if (website || isTooFast(startedAt, MIN_FILL_TIME_MS)) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    if (isRateLimited(`contact:${getClientIp(req)}`)) {
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
