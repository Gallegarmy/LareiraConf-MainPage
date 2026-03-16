import type { APIRoute } from "astro";
import { confirmAttendance } from "../../services/confirmationSheets";

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect }) => {
  const nombre = url.searchParams.get("nombre")?.trim() ?? "";
  const email = url.searchParams.get("email")?.trim().toLowerCase() ?? "";

  if (!email) {
    return redirect("/confirmado?status=error&reason=missing_params", 302);
  }

  const result = await confirmAttendance(nombre || "Invitado", email);

  if (!result.ok) {
    const errorMsg = "error" in result ? result.error : "unknown";
    console.error("[/api/confirmar] Sheet error:", errorMsg);
    return redirect("/confirmado?status=error&reason=server", 302);
  }

  if (result.duplicate) {
    return redirect("/confirmado?status=ya_confirmado", 302);
  }

  return redirect("/confirmado?status=ok", 302);
};
