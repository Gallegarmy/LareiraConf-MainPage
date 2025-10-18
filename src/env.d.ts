/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly GOOGLE_SHEETS_ID: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly GOOGLE_REFRESH_TOKEN: string;
  // Opcional público (ejemplo): readonly PUBLIC_API_URL?: string;
  // Añade aquí cualquier variable PUBLIC_ adicional que necesites exponer al cliente.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
