import type { APIRoute } from "astro";
import { submitVote } from "../../services/votingSheets";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, gremio, artesano, portador } = body ?? {};

    if (!email || !gremio || !artesano || !portador) {
      return new Response(JSON.stringify({ ok: false, error: "missing_fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await submitVote({
      email: email.trim().toLowerCase(),
      gremio: gremio.trim(),
      artesano: artesano.trim(),
      portador: portador.trim(),
    });

    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[/api/submit-vote]", msg);
    return new Response(
      JSON.stringify({ ok: false, error: "server_error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
