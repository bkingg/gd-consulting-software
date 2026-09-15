import { getTransporter, SENDER_EMAIL } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    const transporter = getTransporter();

    await transporter.sendMail({
      from: `"${name} (via gdco.tech)" <${SENDER_EMAIL}>`,
      to: SENDER_EMAIL,
      replyTo: email,
      subject: `GD Consulting - Contact Form Submission from ${name}`,
      text: message,
      html: `<p>${message}</p><p>From: ${name} (${email})</p>`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
