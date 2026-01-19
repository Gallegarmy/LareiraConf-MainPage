import React from "react";
import { useTranslations } from "@/i18n/utils";

interface TeamCopyProps {
  lang: string;
}

const TeamCopy: React.FC<TeamCopyProps> = ({ lang }) => {
  const t = useTranslations(lang as "es" | "gl");

  return (
    <div className="team-copy">
      <h2>{t("team.title")}</h2>
      <p>{t("team.description1")}</p>
      <p>{t("team.description2")}</p>
    </div>
  );
};

export default TeamCopy;
