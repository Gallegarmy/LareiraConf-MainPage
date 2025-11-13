/// <reference path="../.astro/types.d.ts" />

declare module "*.svg?react" {
  import type { FunctionComponent, SVGProps } from "react";
  const content: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "@img/*" {
  const metadata: import("astro").ImageMetadata;
  export default metadata;
}

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
