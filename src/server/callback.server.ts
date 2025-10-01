import type { APIRoute } from "astro";
export const prerender = false;

interface Payload {
  name?: string;
  phone?: string;
}

const googleScriptUrl = import.meta.env.GOOGLE_APPS_SCRIPT_URL ?? process.env.GOOGLE_APPS_SCRIPT_URL;

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!googleScriptUrl) {
      console.error("Missing GOOGLE_APPS_SCRIPT_URL environment variable");
      return new Response(
        JSON.stringify({
          message: "Service indisponible. Contactez l'administrateur.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

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

    const searchParams = new URLSearchParams({
      name,
      phone,
      timestamp: new Date().toISOString(),
    });

    const scriptResponse = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!scriptResponse.ok) {
      const text = await scriptResponse.text();
      throw new Error(
        `Google Apps Script error (${scriptResponse.status}): ${text || "Unknown error"}`
      );
    }

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
