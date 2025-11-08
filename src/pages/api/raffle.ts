import type { APIRoute } from "astro";
import { googleSheetsService } from "../../services/googleSheets";
export const prerender = false; // asegurar SSR para acceder a headers y runtime env

interface IncomingBody {
  name?: string;
  email?: string;
  acceptTerms?: boolean;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: IncomingBody = await request.json().catch(() => ({}));

    const name = body.name?.trim();
    const email = body.email?.trim();
    const acceptTerms = body.acceptTerms === true;

    const timestamp = new Date().toISOString();

    await googleSheetsService.submit({
      name,
      email,
      acceptTerms,
      timestamp,
      sheetName: "nerdearla",
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg =
      e instanceof Error
        ? e.message
        : "Error desconocido al registrar el sorteo";
    // Normalizar mensaje duplicado
    if (msg.startsWith("DUPLICATE_EMAIL")) {
      return new Response("Email ya registrado", { status: 409 });
    }
    return new Response(msg, { status: 500 });
  }
};
