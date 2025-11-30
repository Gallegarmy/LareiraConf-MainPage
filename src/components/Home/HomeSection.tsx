import React from "react";
import ParallaxLayer from "@components/Parallax/ParallaxLayer";
import FireParticles from "@components/Others/FireParticles";
import EventContent from "./EventContent";

import mountainsImg from "@img/parallax/mountains.png";
import treesImg from "@img/parallax/trees.png";
import evilCharacterImg from "@img/parallax/evil-character.png";
import lareiraImg from "@img/parallax/lareira.png";
import groundImg from "@img/parallax/ground.png";

import "@styles/home.css";

const HomeSection = () => {
  return (
    <section id="intro" className="panel home-section">
      <div className="home-parallax" aria-hidden="true">
        <ParallaxLayer speed={-0.5} className="bg-layer">
          <div className="home-gradient" />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.7} className="mountains-layer">
          <img src={mountainsImg.src} alt="Montañas" className="parallax-img" />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.5} className="trees-layer">
          <img src={treesImg.src} alt="Árboles" className="parallax-img" />
        </ParallaxLayer>
        <ParallaxLayer speed={0} className="ground-layer">
          <img src={groundImg.src} alt="" className="ground-image" />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.2} className="evil-character-layer">
          <img
            src={evilCharacterImg.src}
            alt="Personaje misterioso"
            className="parallax-img evil-character-img"
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.1} className="lareira-layer">
          <img
            src={lareiraImg.src}
            alt="Lareira"
            className="parallax-img lareira-img"
          />
        </ParallaxLayer>
        <ParallaxLayer speed={0.2} className="particles-layer">
          <FireParticles count={75} />
        </ParallaxLayer>
      </div>

      <div className="home-content">
        <div className="home-primary" aria-hidden="false">
          <EventContent />
        </div>
        <div className="home-secondary" aria-hidden="true">
          <p className="home-secondary__eyebrow">
            Charlas. Networking. Juegos. Show
          </p>
          <h2 className="home-secondary__title">
            Una conferencia para vivirla en primera persona
          </h2>
          <p className="home-secondary__copy">
            LareiraConf es una conferencia técnica en A Coruña pensada para
            reunir a la comunidad, aprender, conectar y vivir una experiencia
            distinta, con buen rollo y mucha energía.
          </p>
          <p className="home-secondary__copy">
            Este año no vienes solo a escuchar: vienes a participar. Un único
            track, con ponentes top. Pero también dinámicas, sorteos, comida,
            show y muchos momentos diseñados para que conozcas gente, te
            inspires y disfrutes del día.
          </p>
        </div>
      </div>

      <div className="home-background-mobile" aria-hidden="true">
        <div className="home-background__gradient" />
        <img
          src={mountainsImg.src}
          alt=""
          className="home-background__layer mountains"
        />
        <img
          src={treesImg.src}
          alt=""
          className="home-background__layer trees"
        />
        <img
          src={groundImg.src}
          alt=""
          className="home-background__layer ground"
        />
        <img
          src={evilCharacterImg.src}
          alt=""
          className="home-background__layer character"
        />
        <img
          src={lareiraImg.src}
          alt=""
          className="home-background__layer lareira"
        />
        <div className="home-mobile-particles">
          <FireParticles count={45} />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
