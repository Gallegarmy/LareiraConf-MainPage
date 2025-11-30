import React from "react";
import "@styles/speakers.css";
import libraryBackdrop from "@img/parallax/library.png";
import SpeakersCopy from "./SpeakersCopy";
import SpeakersBookPreview from "./SpeakersBookPreview";

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
      <SpeakersCopy />
      <SpeakersBookPreview />
    </div>
  </section>
);

export default SpeakersSection;
