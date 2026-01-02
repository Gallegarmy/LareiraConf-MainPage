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
      <ThroneRoomGallery />
    </div>
  </section>
);

export default SpeakersSection;
