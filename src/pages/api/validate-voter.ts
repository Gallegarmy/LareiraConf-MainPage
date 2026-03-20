import type { APIRoute } from "astro";
import { checkVoterEligibility } from "../../services/votingSheets";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const email = body?.email?.trim().toLowerCase();

    if (!email) {
      return new Response(JSON.stringify({ eligible: false, reason: "missing_email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await checkVoterEligibility(email);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[/api/validate-voter]", msg);
    return new Response(
      JSON.stringify({ eligible: false, reason: "server_error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
