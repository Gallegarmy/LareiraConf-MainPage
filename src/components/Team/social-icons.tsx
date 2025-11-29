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
