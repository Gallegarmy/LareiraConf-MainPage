/// <reference path="../.astro/types.d.ts" />
declare module "*.svg?react" {
  import type { FunctionComponent, SVGProps } from "react";
  const content: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default content;
}
