import React from "react";
import sysarmyIcon from "@img/crew/sysarmy.svg?url";
import pythonIcon from "@img/crew/python.svg?url";
import corunawtfIcon from "@img/crew/corunawtf.svg?url";

export const normalizeLabel = (label: string) => label.trim().toLowerCase();

const assetIconByLabel: Record<string, string | undefined> = {
  "sysarmy galicia": sysarmyIcon,
  "python coruña": pythonIcon,
  "coruña wtf": corunawtfIcon,
};

const svgIconByLabel: Record<string, React.ReactElement> = {
  linkedin: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      role="presentation"
    >
      <path d="M22 2V1H2v1H1v20h1v1h20v-1h1V2h-1Zm-9 10v8h-3v-11h3v1h1v-1h4v1h1v10h-3v-8h-3Zm-9-4V5h3v3H4Zm3 1v11H4V9h3Z" />
    </svg>
  ),
  instagram: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      role="presentation"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  x: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
    >
      <path d="M4 4l16 16" />
      <path d="M20 4 4 20" />
    </svg>
  ),
  twitter: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      role="presentation"
    >
      <path d="M21.5 6.13a5.94 5.94 0 0 1-1.72.47 2.96 2.96 0 0 0 1.3-1.63 5.92 5.92 0 0 1-1.88.72A2.96 2.96 0 0 0 16.5 5c-1.64 0-2.96 1.35-2.96 3 0 .24.02.47.07.7A8.4 8.4 0 0 1 4.6 5.46a3.03 3.03 0 0 0-.4 1.51 3 3 0 0 0 1.32 2.49 2.9 2.9 0 0 1-1.34-.37v.04c0 1.47 1.03 2.7 2.4 2.98a2.92 2.92 0 0 1-1.33.05 3 3 0 0 0 2.77 2.08A5.93 5.93 0 0 1 3 16.86a8.36 8.36 0 0 0 4.56 1.34c5.48 0 8.47-4.58 8.47-8.55 0-.13 0-.26-.01-.39a6.08 6.08 0 0 0 1.48-1.53Z" />
    </svg>
  ),
  youtube: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      role="presentation"
    >
      <path d="M21.6 7.2a2.74 2.74 0 0 0-1.93-1.94C18.06 5 12 5 12 5s-6.06 0-7.67.26A2.74 2.74 0 0 0 2.4 7.2 28.39 28.39 0 0 0 2.14 12 28.39 28.39 0 0 0 2.4 16.8a2.74 2.74 0 0 0 1.93 1.94C5.94 19 12 19 12 19s6.06 0 7.67-.26A2.74 2.74 0 0 0 21.6 16.8 28.39 28.39 0 0 0 21.86 12 28.39 28.39 0 0 0 21.6 7.2Zm-11 7.87V8.93L15.47 12Z" />
    </svg>
  ),
  bluesky: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      role="presentation"
    >
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
    </svg>
  ),
  default: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
    >
      <path d="m7 17 10-10" />
      <path d="M11 7h6v6" />
      <rect x="3" y="3" width="18" height="18" rx="0" />
    </svg>
  ),
};

export const renderSocialIcon = (label: string) => {
  const normalized = normalizeLabel(label);
  const asset = assetIconByLabel[normalized];

  if (asset) {
    return (
      <span className="character-social-icon" aria-hidden="true">
        <img src={asset} alt="" loading="lazy" />
      </span>
    );
  }

  const svg = svgIconByLabel[normalized] ?? svgIconByLabel.default;
  return (
    <span className="character-social-icon" aria-hidden="true">
      {svg}
    </span>
  );
};
