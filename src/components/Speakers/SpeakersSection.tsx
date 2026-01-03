import React from "react";
import "@styles/speakers.css";
import "@styles/ThroneRoomGallery.scss";
import libraryBackdrop from "@img/parallax/library.png";
import ThroneRoomGallery from "./ThroneRoomGallery";

const SpeakersSection: React.FC = () => (
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
      <h2 className="speakers-title">Portadores de la llama</h2>
      <p className="speakers-description">
        PONENTES QUE TRAEN SU LLAMA PARA COMPARTIR CONOCIMIENTO,
        EXPERIENCIAS E IDEAS CON LA COMUNIDAD.
      </p>
      <ThroneRoomGallery />
    </div>
  </section>
);

export default SpeakersSection;
