/**
 * Google Sheets OAuth service (Astro server side)
 * Mirrors logic from React project adapting env var names (without REACT_APP_)
 */
export interface FormSubmissionData {
  name: string;
  email: string;
  acceptTerms: boolean;
  timestamp: string;
  ipAddress?: string;
  sheetName: string; // fixed (e.g. "trg" or general raffle)
}

interface GoogleSheetsConfig {
  spreadsheetId: string;
}

class GoogleSheetsService {
  private config: GoogleSheetsConfig;

  constructor(config: GoogleSheetsConfig) {
    this.config = config;
  }

  private required(name: string, value: string | undefined): string {
    if (!value) throw new Error(`Missing env var ${name}`);
    return value;
  }

  private async getAccessToken(): Promise<string> {
    const clientId = this.required("GOOGLE_CLIENT_ID", import.meta.env.GOOGLE_CLIENT_ID);
    const clientSecret = this.required("GOOGLE_CLIENT_SECRET", import.meta.env.GOOGLE_CLIENT_SECRET);
    const refreshToken = this.required("GOOGLE_REFRESH_TOKEN", import.meta.env.GOOGLE_REFRESH_TOKEN);

    const resp = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token"
      })
    });

    if (!resp.ok) {
      const txt = await resp.text();
      throw new Error(`OAuth token refresh failed: ${txt}`);
    }
    const data = await resp.json();
    return data.access_token;
  }

  private async checkEmailExists(accessToken: string, sheetName: string, email: string): Promise<boolean> {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${encodeURIComponent(sheetName)}`;
      const resp = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!resp.ok) return false;
      const data = await resp.json();
      const rows: string[][] = data.values || [];
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row && row[2] && row[2].toLowerCase() === email.toLowerCase()) {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  async submit(data: FormSubmissionData): Promise<void> {
    const accessToken = await this.getAccessToken();
    const sheetName = data.sheetName;

    // Email uniqueness
    if (await this.checkEmailExists(accessToken, sheetName, data.email)) {
      throw new Error("DUPLICATE_EMAIL: El email ya está registrado");
    }

    const values = [[
      data.timestamp,
      data.name,
      data.email,
      data.acceptTerms ? "Sí" : "No",
      data.ipAddress || "N/A"
    ]];

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${encodeURIComponent(sheetName)}:append?valueInputOption=RAW`;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ values })
    });

    if (!resp.ok) {
      const txt = await resp.text();
      throw new Error(`Failed to append row: ${txt}`);
    }
  }
}

const spreadsheetId = import.meta.env.GOOGLE_SHEETS_ID || "";

export const googleSheetsService = new GoogleSheetsService({
  spreadsheetId
});
