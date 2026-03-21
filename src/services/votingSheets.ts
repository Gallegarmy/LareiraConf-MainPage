/**
 * Voting service — Google Sheets via OAuth
 * Uses same OAuth credentials as confirmationSheets.ts
 * Reads/writes to GOOGLE_VOTING_SHEET_ID spreadsheet:
 *   - "Confirmaciones" tab: validate voter is a registered attendee
 *   - "Votos" tab: check/store votes (must be created manually in the sheet)
 *     Headers: Timestamp | Email | Gremio | Artesano | Portador
 */

const CONFIRMATIONS_SHEET = "Confirmaciones";
const VOTES_SHEET = "Votos";

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

async function readSheet(
  accessToken: string,
  spreadsheetId: string,
  sheetName: string,
): Promise<string[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.values ?? [];
}

async function appendRow(
  accessToken: string,
  spreadsheetId: string,
  sheetName: string,
  row: string[],
): Promise<void> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}:append?valueInputOption=USER_ENTERED`;
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

async function updateRow(
  accessToken: string,
  spreadsheetId: string,
  sheetName: string,
  rowIndex: number,
  row: string[],
): Promise<void> {
  const range = `${encodeURIComponent(sheetName)}!A${rowIndex}:E${rowIndex}`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sheets update failed: ${text}`);
  }
}

export interface PreviousVotes {
  gremio: string;
  artesano: string;
  portador: string;
}

export type EligibilityResult =
  | { eligible: true; alreadyVoted: true; previousVotes: PreviousVotes }
  | { eligible: true; alreadyVoted: false }
  | { eligible: false; reason: "not_registered" };

export async function checkVoterEligibility(email: string): Promise<EligibilityResult> {
  const _env: Record<string, string> = (import.meta as any).env ?? {};
  const spreadsheetId =
    process.env.GOOGLE_VOTING_SHEET_ID ?? _env.GOOGLE_VOTING_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error("Missing env var: GOOGLE_VOTING_SHEET_ID");
  }

  const accessToken = await getAccessToken();
  const normalized = email.toLowerCase().trim();

  // Confirmaciones: column index 0 = email
  const confirmRows = await readSheet(accessToken, spreadsheetId, CONFIRMATIONS_SHEET);
  const isRegistered = confirmRows.some((row) => row[0]?.toLowerCase().trim() === normalized);
  if (!isRegistered) return { eligible: false, reason: "not_registered" };

  // Votos: Timestamp | Email | Gremio | Artesano | Portador
  const voteRows = await readSheet(accessToken, spreadsheetId, VOTES_SHEET);
  const existingRow = voteRows.find((row) => row[1]?.toLowerCase().trim() === normalized);

  if (existingRow) {
    return {
      eligible: true,
      alreadyVoted: true,
      previousVotes: {
        gremio: existingRow[2] ?? "",
        artesano: existingRow[3] ?? "",
        portador: existingRow[4] ?? "",
      },
    };
  }

  return { eligible: true, alreadyVoted: false };
}

export interface VoteData {
  email: string;
  gremio: string;
  artesano: string;
  portador: string;
}

export type VoteResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitVote(data: VoteData): Promise<VoteResult> {
  const _env: Record<string, string> = (import.meta as any).env ?? {};
  const spreadsheetId =
    process.env.GOOGLE_VOTING_SHEET_ID ?? _env.GOOGLE_VOTING_SHEET_ID;

  if (!spreadsheetId) {
    return { ok: false, error: "Missing env var: GOOGLE_VOTING_SHEET_ID" };
  }

  try {
    const accessToken = await getAccessToken();
    const normalized = data.email.toLowerCase().trim();

    const normalized = data.email.toLowerCase().trim();

    // Re-validate before writing (server-side double check)
    const confirmRows = await readSheet(accessToken, spreadsheetId, CONFIRMATIONS_SHEET);
    const isRegistered = confirmRows.some((row) => row[0]?.toLowerCase().trim() === normalized);
    if (!isRegistered) return { ok: false, error: "not_registered" };

    const voteRows = await readSheet(accessToken, spreadsheetId, VOTES_SHEET);
    const existingRowIndex = voteRows.findIndex(
      (row) => row[1]?.toLowerCase().trim() === normalized,
    );

    const now = new Date();
    const timestamp = now.toLocaleString("es-ES", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });

    const newRow = [timestamp, normalized, data.gremio, data.artesano, data.portador];

    if (existingRowIndex !== -1) {
      await updateRow(accessToken, spreadsheetId, VOTES_SHEET, existingRowIndex + 1, newRow);
    } else {
      await appendRow(accessToken, spreadsheetId, VOTES_SHEET, newRow);
    }

    return { ok: true };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[submitVote] Error:", msg);
    return { ok: false, error: msg };
  }
}
