/// <reference path="../.astro/types.d.ts" />

declare module "*.svg?react" {
  import type { FunctionComponent, SVGProps } from "react";
  const content: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.svg?url" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: import("astro").ImageMetadata;
  export default value;
}

declare module "*.jpg" {
  const value: import("astro").ImageMetadata;
  export default value;
}

declare module "*.jpeg" {
  const value: import("astro").ImageMetadata;
  export default value;
}

declare module "*.webp" {
  const value: import("astro").ImageMetadata;
  export default value;
}

declare module "*.gif" {
  const value: import("astro").ImageMetadata;
  export default value;
}
