import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  message: z.string().trim().min(1).max(5000),
});

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

    const { name, email, message } = parsed.data;

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
