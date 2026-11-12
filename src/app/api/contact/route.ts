import { z } from "zod";
import { getTransporter, SENDER_EMAIL } from "@/lib/mailer";
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
      return Response.json({ error: "Invalid fields" }, { status: 400 });
    }
    const { name, email, message, website, startedAt } = parsed.data;

    // Pretend success for bots so they don't adapt
    if (website || isTooFast(startedAt, MIN_FILL_TIME_MS)) {
      return Response.json({ success: true });
    }

    if (isRateLimited(`contact:${getClientIp(req)}`)) {
      return Response.json({ error: "Too many requests" }, { status: 429 });
    }

    const transporter = getTransporter();

    await transporter.sendMail({
      // Strip quotes and line breaks so the name can't break the header
      from: `"${name.replace(/["\r\n]/g, "")} (via gdco.tech)" <${SENDER_EMAIL}>`,
      to: SENDER_EMAIL,
      replyTo: email,
      subject: `GD Consulting - Contact Form Submission from ${name.replace(/[\r\n]/g, " ")}`,
      text: `${message}\n\nFrom: ${name} (${email})`,
      html: `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p><p>From: ${escapeHtml(name)} (${escapeHtml(email)})</p>`,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
