import React from "react";
import Calendar from "@img/icons/calendar.svg?react";
import Location from "@img/icons/location.svg?react";
import { useTranslations, getLangFromUrl } from "@/i18n/utils";

import dinahostingLogo from "@img/sponsors/dinahosting-main.svg";

interface EventContentProps {
  lang: string;
}

const EventContent: React.FC<EventContentProps> = ({ lang }) => {
  const t = useTranslations(lang as "es" | "gl");

  return (
    <div className="content">
      <div className="home-info">
        <h2 className="element">
          <Calendar className="icon" />
          <span>{t("home.date")}</span>
        </h2>
        <h2 className="element">
          <Location className="icon" />
          <span>{t("home.location")}</span>
        </h2>
      </div>
      <h1 className="logo">{t("home.title")}</h1>

      <div
        className="home-sponsored"
        aria-label={t("home.sponsoredBy") + " Dinahosting"}
      >
        <span className="home-sponsored__label">{t("home.sponsoredBy")}</span>
        <img
          className="home-sponsored__logo"
          src={dinahostingLogo.src}
          alt="Dinahosting"
          decoding="async"
          loading="eager"
        />
      </div>
    </div>
  );
};

export default EventContent;
