import React, { useState, useEffect } from "react";
import Calendar from "@img/icons/calendar.svg?react";
import Location from "@img/icons/location.svg?react";
import { useTranslations, getLangFromUrl } from "@/i18n/utils";

import dinahostingLogo from "@img/sponsors/dinahosting-main.svg";

const REVEAL_DATE = new Date("2026-03-22T10:00:00");

interface EventContentProps {
  lang: string;
}

const EventContent: React.FC<EventContentProps> = ({ lang }) => {
  const t = useTranslations(lang as "es" | "gl");
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const check = () => setShowLinks(new Date() >= REVEAL_DATE);
    check();
    if (new Date() < REVEAL_DATE) {
      const ms = REVEAL_DATE.getTime() - Date.now();
      const timer = setTimeout(check, ms);
      return () => clearTimeout(timer);
    }
  }, []);

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

      {showLinks && (
        <div className="home-quick-links">
          <a href="/premios" className="home-quick-link">
            {t("nav.premios")}
          </a>
          <a href="/grimorio" className="home-quick-link">
            {t("nav.grimorio")}
          </a>
          <a href="/ofertas" className="home-quick-link">
            {t("nav.ofertas")}
          </a>
        </div>
      )}
    </div>
  );
};

export default EventContent;
