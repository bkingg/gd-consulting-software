import nodemailer from "nodemailer";

// Spacemail SMTP (mailbox: contact@gdco.tech). See
// https://www.spaceship.com/knowledgebase/connect-spacemail-to-email-client/
export const getTransporter = () =>
  nodemailer.createTransport({
    host: "mail.spacemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SPACEMAIL_USER,
      pass: process.env.SPACEMAIL_PASS,
    },
  });

export const SENDER_EMAIL = process.env.SPACEMAIL_USER ?? "contact@gdco.tech";
