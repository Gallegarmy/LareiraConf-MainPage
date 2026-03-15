/**
 * Attendance confirmation service — Google Sheets via OAuth (same credentials
 * as the raffle service: GOOGLE_CLIENT_ID / SECRET / REFRESH_TOKEN).
 *
 * Writes to a separate spreadsheet defined by GOOGLE_CONFIRMATION_SHEET_ID.
 *
 * Required env vars:
 *   GOOGLE_CLIENT_ID              — OAuth client ID (already used by raffle)
 *   GOOGLE_CLIENT_SECRET          — OAuth client secret (already used by raffle)
 *   GOOGLE_REFRESH_TOKEN          — OAuth refresh token (already used by raffle)
 *   GOOGLE_CONFIRMATION_SHEET_ID  — ID of the attendance Google Sheet
 */

const SHEET_NAME = "Confirmaciones";

// ─── OAuth ────────────────────────────────────────────────────────────────────

async function getAccessToken(): Promise<string> {
  const _env: Record<string, string> = (import.meta as any).env ?? {};

  const clientId     = process.env.GOOGLE_CLIENT_ID     ?? _env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? _env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN ?? _env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    const missing = [
      !clientId     && "GOOGLE_CLIENT_ID",
      !clientSecret && "GOOGLE_CLIENT_SECRET",
      !refreshToken && "GOOGLE_REFRESH_TOKEN",
    ].filter(Boolean).join(", ");
    throw new Error(`OAuth credentials not configured. Missing: ${missing}`);
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id:     clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type:    "refresh_token",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OAuth token refresh failed: ${text}`);
  }

  const data = await res.json();
  if (!data.access_token) throw new Error("No access_token in Google response");
  return data.access_token;
}

// ─── Sheet helpers ────────────────────────────────────────────────────────────

async function emailAlreadyConfirmed(
  accessToken: string,
  spreadsheetId: string,
  email: string,
): Promise<boolean> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(SHEET_NAME)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });

  if (!res.ok) return false; // sheet might not exist yet → allow write

  const data = await res.json();
  const rows: string[][] = data.values ?? [];

  // Column index 1 = Email  (Nombre | Email | Fecha | Hora)
  return rows.some((row) => row[1]?.toLowerCase() === email.toLowerCase());
}

async function appendRow(
  accessToken: string,
  spreadsheetId: string,
  row: string[],
): Promise<void> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(SHEET_NAME)}:append?valueInputOption=USER_ENTERED`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sheets append failed: ${text}`);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export type ConfirmResult =
  | { ok: true; duplicate: false }
  | { ok: true; duplicate: true }
  | { ok: false; error: string };

export async function confirmAttendance(
  nombre: string,
  email: string,
): Promise<ConfirmResult> {
  const _env: Record<string, string> = (import.meta as any).env ?? {};
  const spreadsheetId =
    process.env.GOOGLE_CONFIRMATION_SHEET_ID ?? _env.GOOGLE_CONFIRMATION_SHEET_ID;

  if (!spreadsheetId) {
    return { ok: false, error: "Missing env var: GOOGLE_CONFIRMATION_SHEET_ID" };
  }

  try {
    const accessToken = await getAccessToken();

    const duplicate = await emailAlreadyConfirmed(accessToken, spreadsheetId, email);
    if (duplicate) return { ok: true, duplicate: true };

    const now = new Date();
    const fecha = now.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
    const hora  = now.toLocaleTimeString("es-ES",  { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    await appendRow(accessToken, spreadsheetId, [nombre, email, fecha, hora]);

    return { ok: true, duplicate: false };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[confirmAttendance] Error:", msg);
    return { ok: false, error: msg };
  }
}
