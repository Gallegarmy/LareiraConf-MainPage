import React from "react";
import ParallaxLayer from "@components/Parallax/ParallaxLayer";
import FireParticles from "@components/Others/FireParticles";
import Calendar from "@img/icons/calendar.svg?react";
import Location from "@img/icons/location.svg?react";

import mountainsImg from "@img/parallax/mountains.png";
import treesImg from "@img/parallax/trees.png";
import evilCharacterImg from "@img/parallax/evil-character.png";
import lareiraImg from "@img/parallax/lareira.png";

import "@styles/home.css";

const HomeSection = () => {
  return (
    <div className="panel home-section">
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <ParallaxLayer speed={-0.5} className="bg-layer">
          <div
            style={{
              background:
                "radial-gradient(ellipse at bottom, #35221b 0%, #0f0b09 100%)",
              width: "100%",
              height: "100%",
            }}
          />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.7} className="mountains-layer">
          <img
            src={mountainsImg.src}
            alt="mountains"
            className="parallax-img"
          />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.5} className="trees-layer">
          <img src={treesImg.src} alt="trees" className="parallax-img" />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.2} className="evil-character-layer">
          <img
            src={evilCharacterImg.src}
            alt="evil character"
            className="parallax-img evil-character-img"
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0} className="content-layer">
          <div className="content">
            <div className="home-info">
              <h2 className="element">
                <Calendar className="icon" />
                <span>20.03.26</span>
              </h2>
              <h2 className="element">
                <Location className="icon" />
                <span>A Coruña</span>
              </h2>
            </div>
            <h1 className="logo">Lareira Conf '26</h1>
            <div className="subtitle">
              <p>El encuentro tech que enciende ideas y conecta comunidades</p>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer speed={0.1} className="lareira-layer">
          <img
            src={lareiraImg.src}
            alt="lareira"
            className="parallax-img lareira-img"
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.2} className="particles-layer">
          <FireParticles count={75} />
        </ParallaxLayer>
      </div>
    </div>
  );
};

export default HomeSection;
