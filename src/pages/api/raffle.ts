import type { APIRoute } from "astro";
import { googleSheetsService } from "../../services/googleSheets";

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

    if (!name || name.length < 2) {
      return new Response("Nombre inválido", { status: 400 });
    }
    if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      return new Response("Email inválido", { status: 400 });
    }
    if (!acceptTerms) {
      return new Response("Debes aceptar los términos", { status: 400 });
    }

    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0].trim() || "";

    const timestamp = new Date().toISOString();

    await googleSheetsService.submit({
      name,
      email,
      acceptTerms,
      timestamp,
      ipAddress: ip,
      sheetName: "trg"
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
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
