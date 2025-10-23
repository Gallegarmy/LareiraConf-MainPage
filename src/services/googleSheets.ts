// Google Sheets API integration service
export interface FormSubmissionData {
  name: string;
  email: string;
  acceptTerms: boolean;
  eventId: string;
  timestamp: string;
}

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  sheetName: string;
  apiKey?: string;
}

class GoogleSheetsService {
  private config: GoogleSheetsConfig;

  constructor(config: GoogleSheetsConfig) {
    this.config = config;
  }

  /**
   * Get OAuth access token using client credentials
   */
  private async getAccessToken(): Promise<string> {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error(
        'OAuth credentials not configured. Missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_REFRESH_TOKEN.'
      );
    }

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      const raw = await response.text();
      let parsed: any = null;
      try { parsed = JSON.parse(raw); } catch {}
      // Clasificar invalid_grant para guiar la regeneración del refresh token
      if (parsed?.error === 'invalid_grant') {
        /**
         * Causas típicas:
         * - Refresh token generado sin access_type=offline & prompt=consent
         * - Consent screen / app aún en modo testing y el usuario ya no está en la lista de test
         * - Se revocó manualmente en la cuenta (Seguridad -> Acceso de terceros)
         * - Se regeneraron credenciales (client secret nuevo) y el refresh antiguo quedó inválido
         * - Uso de redirect_uri diferente al que se usó al obtener el token
         * Acciones:
         * 1. Verificar en Google Cloud: OAuth consent screen y que el usuario esté autorizado.
         * 2. Regenerar refresh token:
         *    https://accounts.google.com/o/oauth2/v2/auth?response_type=code&access_type=offline&prompt=consent&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fspreadsheets
         * 3. Intercambiar el code por tokens en /token y copiar el nuevo refresh token a .env
         */
        throw new Error('OAUTH_INVALID_GRANT: refresh token expirado/revocado. Regenerar siguiendo comentarios en código. Raw=' + raw);
      }
      throw new Error(`OAuth token refresh failed: ${raw}`);
    }

    const data = await response.json();

    if (!data.access_token) {
      throw new Error('No access token returned from Google OAuth response.');
    }

    return data.access_token;
  }

  /**
   * Check if email already exists in the sheet
   */
  private async checkEmailExists(accessToken: string, sheetName: string, email: string): Promise<boolean> {
    try {
      console.log('🔧 DEBUG: Checking if email exists:', email);

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${sheetName}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      if (!response.ok) {
        console.log('⚠️ WARNING: Could not check existing emails, proceeding...');
        return false;
      }

      const data = await response.json();
      const rows = data.values || [];

      // Skip header row if exists, then check email column (index 2)
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row && row[2] && row[2].toLowerCase() === email.toLowerCase()) {
          console.log('❌ WARNING: Email already exists in sheet:', email);
          return true;
        }
      }

      console.log('✅ DEBUG: Email not found, can proceed:', email);
      return false;
    } catch (error) {
      console.log('⚠️ WARNING: Error checking email, proceeding anyway:', error);
      return false;
    }
  }

  /**
   * Get the number of participants for a specific event
   */
  async getParticipantCount(eventId: string): Promise<number> {
    try {
      console.log('🔧 DEBUG: Getting participant count for event:', eventId);

      // Get OAuth access token
      const accessToken = await this.getAccessToken();

      const sheetName = eventId;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${sheetName}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      if (!response.ok) {
        console.log('⚠️ WARNING: Could not get participant count, returning 0');
        return 0;
      }

      const data = await response.json();
      const rows = data.values || [];

      // Subtract 1 if there's a header row, otherwise count all rows
      const participantCount = Math.max(0, rows.length - 1);

      console.log('✅ DEBUG: Participant count:', participantCount);
      return participantCount;
    } catch (error) {
      console.log('⚠️ WARNING: Error getting participant count:', error);
      return 0;
    }
  }

  /**
   * Submit form data to Google Sheets using OAuth access token
   * Uses the eventId directly as the sheet name and validates email uniqueness
   */
  async submitToSheet(data: FormSubmissionData): Promise<void> {
    try {
      console.log('🔧 DEBUG: Starting OAuth Google Sheets submission...');

      // Get OAuth access token
      const accessToken = await this.getAccessToken();
      console.log('🔧 DEBUG: OAuth token obtained successfully');

      // Use the eventId directly as the sheet name
      const sheetName = data.eventId;
      console.log('🔧 DEBUG: Using sheet name from eventId:', sheetName);

      // Check if email already exists in the sheet
      const emailExists = await this.checkEmailExists(accessToken, sheetName, data.email);
      if (emailExists) {
        console.error('❌ ERROR: Email already registered:', data.email);
        throw new Error(`DUPLICATE_EMAIL: El email ${data.email} ya está registrado en este sorteo`);
      }

      const values = [
        [
          data.timestamp,
          data.name,
          data.email,
          data.acceptTerms ? 'Sí' : 'No',
          data.eventId
        ]
      ];

      console.log('🔧 DEBUG: Sending data to sheet:', sheetName);

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${sheetName}:append?valueInputOption=RAW`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: values
        })
      });

      console.log('🔧 DEBUG: Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ ERROR: Failed to submit:', errorText);
        throw new Error(`Failed to submit to sheet: ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ SUCCESS: Data added to sheet successfully!');
      console.log('✅ Sheet used:', sheetName);
      console.log('✅ Result:', result);

    } catch (error) {
      console.error('❌ FATAL ERROR: Failed to submit to Google Sheets:', error);
      throw new Error(`Failed to submit form data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async submit(data: { name?: string; email?: string; acceptTerms?: boolean; timestamp: string; sheetName: string }): Promise<void> {
    const payload: FormSubmissionData = {
      name: data.name || '',
      email: data.email || '',
      acceptTerms: !!data.acceptTerms,
      eventId: data.sheetName,
      timestamp: data.timestamp
    };
    return this.submitToSheet(payload);
  }
}


const _env: any = (import.meta as any).env || {};
const googleSheetsConfig: GoogleSheetsConfig = {
  spreadsheetId: _env.GOOGLE_SHEETS_ID || undefined,
  sheetName: 'trg',
  apiKey: _env.GOOGLE_SHEETS_API_KEY || undefined,
};

if (!googleSheetsConfig.spreadsheetId) {
  console.warn('[raffle][env] GOOGLE_SHEETS_ID no definido (revisa .env en raíz del proyecto y reinicia el dev server)');
}

export const googleSheetsService = new GoogleSheetsService(googleSheetsConfig);
