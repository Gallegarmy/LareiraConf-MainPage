import React from "react";
import "@styles/speakers.css";
import bookBackdrop from "@img/parallax/lareira4.png";
import treesForeground from "@img/parallax/trees.png";
import SpeakersCopy from "./SpeakersCopy";
import SpeakersBookPreview from "./SpeakersBookPreview";

const SpeakersSection: React.FC = () => (
  <section id="speakers" className="panel speakers-section">
    <div className="speakers-parallax" aria-hidden="true">
      <img
        src={bookBackdrop.src}
        alt=""
        className="speakers-parallax__background"
        loading="lazy"
      />
      <img
        src={treesForeground.src}
        alt=""
        className="speakers-parallax__foreground"
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
