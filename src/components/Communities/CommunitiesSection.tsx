import React from "react";
import "./CommunitiesSection.scss";
import { communities } from "./communities-data";
import FireParticles from "@components/Others/FireParticles";
import communitiesCamp from "@img/parallax/communities-camp.png";

const CommunitiesSection: React.FC = () => {
  return (
    <section className="panel communities-section" id="comunidades">
      <div className="communities-section__background">
        <div className="communities-section__bg-layer">
          <img
            src={communitiesCamp.src}
            alt="Campamento nocturno con hoguera"
            className="communities-section__backdrop-img"
          />
        </div>
        <div className="communities-section__particles">
          <FireParticles count={85} />
        </div>
      </div>

      <div className="communities-section__overlay"></div>

      <div className="communities-section__content">
        <h2 className="communities-section__title">Comunidades</h2>

        <div className="communities-section__intro">
          <p>
            Lareira Conf es posible gracias a la colaboración de las comunidades
            tecnológicas de Galicia. Juntas, compartimos el fuego del
            conocimiento y la pasión por la tecnología.
          </p>
        </div>

        <div className="communities-section__grid">
          {communities.map((community) => (
            <a
              key={community.id}
              href={community.url}
              target="_blank"
              rel="noopener noreferrer"
              className="community-card"
              aria-label={`Visitar ${community.name}`}
            >
              <div className="community-card__logo-wrapper">
                <img
                  src={community.logo}
                  alt={community.alt}
                  className="community-card__logo"
                  loading="lazy"
                />
              </div>
              <h3 className="community-card__name">{community.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitiesSection;
