import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

interface Payload {
  name?: string;
  phone?: string;
}

const mailTo = process.env.MAIL_TO ?? "test@test.com";
const mailFrom = process.env.MAIL_FROM ?? "no-reply@envolet-toit.test";

function createTransport() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            }
          : undefined,
    });
  }

  return nodemailer.createTransport({
    jsonTransport: true,
  });
}

const transporter = createTransport();

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: Payload = await request.json();
    const name = body.name?.trim();
    const phone = body.phone?.trim();

    if (!name || !phone) {
      return new Response(
        JSON.stringify({ message: "Les champs nom et téléphone sont requis." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: "Nouvelle demande de rappel",
      text: `Nom: ${name}\nTéléphone: ${phone}`,
      html: `<p><strong>Nom:</strong> ${name}</p><p><strong>Téléphone:</strong> ${phone}</p>`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("callback form error", error);
    return new Response(
      JSON.stringify({
        message: "Impossible d'envoyer votre demande pour le moment.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
