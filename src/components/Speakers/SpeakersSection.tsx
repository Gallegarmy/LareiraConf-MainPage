import React from "react";
import "@styles/speakers.css";
import "@styles/ThroneRoomGallery.scss";
import libraryBackdrop from "@img/parallax/library.png";
import ThroneRoomGallery from "./ThroneRoomGallery";
import { useTranslations } from "@/i18n/utils";

interface SpeakersSectionProps {
  lang: string;
}

const SpeakersSection: React.FC<SpeakersSectionProps> = ({ lang }) => {
  const t = useTranslations(lang as "es" | "gl");

  return (
    <section id="speakers" className="panel speakers-section">
      <div className="speakers-parallax" aria-hidden="true">
        <img
          src={libraryBackdrop.src}
          alt=""
          className="speakers-parallax__background"
          loading="lazy"
        />
        <div className="speakers-parallax__gradient" />
      </div>

      <div className="speakers-content">
        <h2 className="speakers-title">{t("speakers.title")}</h2>
        <p className="speakers-description">{t("speakers.description")}</p>
        <ThroneRoomGallery lang={lang} />
      </div>
    </section>
  );
};

export default SpeakersSection;
