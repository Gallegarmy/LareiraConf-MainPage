import React from "react";
import FireParticles from "@components/Others/FireParticles";
import sponsorsBg from "@img/parallax/sponsors-bg.png";
import "@styles/sponsors.css";

// Importar logos
import dinahostingLogo from "@img/sponsors/dinahosting.svg";
import raiolaLogo from "@img/sponsors/raiola.svg";
import denodoLogo from "@img/sponsors/denodo.svg";
import automatticLogo from "@img/sponsors/automattic.svg";
import docutenLogo from "@img/sponsors/docuten.svg";
import nextdigitalLogo from "@img/sponsors/nextdigital.svg";
import gradiantLogo from "@img/sponsors/gradiant.svg";
import teimasLogo from "@img/sponsors/teimas.svg";
import captologyLogo from "@img/sponsors/captology.svg";
import keleaLogo from "@img/sponsors/kelea.svg";

// Datos placeholder
const sponsors = {
  granMaestro: {
    name: "Dinahosting",
    tier: "gran-maestro",
    logo: dinahostingLogo.src,
    avatar: "/images/tickets/paladines.png",
  },
  maestrosArtesanos: [
    {
      name: "Raiola",
      tier: "maestro-artesano",
      logo: raiolaLogo.src,
      avatar: "/images/tickets/guerreros.png",
    },
    {
      name: "Denodo",
      tier: "maestro-artesano",
      logo: denodoLogo.src,
      avatar: "/images/tickets/guerreros.png",
    },
    {
      name: "Automattic",
      tier: "maestro-artesano",
      logo: automatticLogo.src,
      avatar: "/images/tickets/guerreros.png",
    },
    {
      name: "Gradiant",
      tier: "maestro-artesano",
      logo: gradiantLogo.src,
      avatar: "/images/tickets/guerreros.png",
    },
    {
      name: "Docuten",
      tier: "maestro-artesano",
      logo: docutenLogo.src,
      avatar: "/images/tickets/guerreros.png",
    },
    {
      name: "NextDigital",
      tier: "maestro-artesano",
      logo: nextdigitalLogo.src,
      avatar: "/images/tickets/guerreros.png",
    },
    {
      name: "Accenture",
      tier: "maestro-artesano",
      logo: null,
      avatar: "/images/tickets/guerreros.png",
    },
    {
      name: "NttData",
      tier: "maestro-artesano",
      logo: null,
      avatar: "/images/tickets/guerreros.png",
    },
  ],
  oficialesArtesanos: [
    {
      name: "Teimas",
      tier: "oficial-artesano",
      logo: teimasLogo.src,
      avatar: "/images/tickets/aventureros.png",
    },
    {
      name: "Captology",
      tier: "oficial-artesano",
      logo: captologyLogo.src,
      avatar: "/images/tickets/aventureros.png",
    },
    {
      name: "Kelea",
      tier: "oficial-artesano",
      logo: keleaLogo.src,
      avatar: "/images/tickets/aventureros.png",
    },
  ],
};

interface SponsorCardProps {
  name: string;
  tier: string;
  logo?: string | null;
  avatar?: string | null;
}

const SponsorCard: React.FC<SponsorCardProps> = ({
  name,
  tier,
  logo,
  avatar,
}) => {
  return (
    <div className={`sponsor-card sponsor-card--${tier}`}>
      <div className="sponsor-card__character">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="sponsor-card__character-img"
          />
        ) : (
          <div className="sponsor-card__character-placeholder">?</div>
        )}
      </div>
      <div className="sponsor-card__poster">
        <div className="sponsor-card__poster-inner">
          {logo ? (
            <img src={logo} alt={name} className="sponsor-card__logo" />
          ) : (
            <div className="sponsor-card__logo-placeholder">?</div>
          )}
        </div>
      </div>
    </div>
  );
};

const SponsorsSection: React.FC = () => {
  return (
    <section id="sponsors" className="panel sponsors-section">
      <div className="sponsors-parallax" aria-hidden="true">
        <img
          src={sponsorsBg.src}
          alt=""
          className="sponsors-parallax-img sponsors-backdrop-img"
        />
        <div className="sponsors-gradient" />
        <div className="sponsors-particles">
          <FireParticles count={65} />
        </div>
      </div>

      <div className="sponsors-content">
        {/* Cartel Maestros da Lareira */}
        <div className="sponsors-section__sign">
          <h2 className="sponsors-section__sign-text">Maestros da lareira</h2>
        </div>

        <div className="sponsors-grid">
          {/* Fila 1: Oficiales (izquierda) + Gran Maestro (centro) + Oficiales (derecha) */}
          <div className="sponsors-grid__oficial sponsors-grid__oficial--left">
            <SponsorCard {...sponsors.oficialesArtesanos[0]} />
          </div>

          <div className="sponsors-grid__gran-maestro">
            <SponsorCard {...sponsors.granMaestro} />
          </div>

          <div className="sponsors-grid__oficial sponsors-grid__oficial--center">
            <SponsorCard {...sponsors.oficialesArtesanos[2]} />
          </div>

          <div className="sponsors-grid__oficial sponsors-grid__oficial--right">
            <SponsorCard {...sponsors.oficialesArtesanos[1]} />
          </div>

          {/* Maestros Artesanos */}
          <div className="sponsors-grid__maestros">
            {/* Fila 1 */}
            <div className="sponsors-grid__maestros-row">
              <div>
                <SponsorCard {...sponsors.maestrosArtesanos[0]} />
              </div>
              <div />
              <div>
                <SponsorCard {...sponsors.maestrosArtesanos[1]} />
              </div>
              <div />
              <div />
              <div />
              <div>
                <SponsorCard {...sponsors.maestrosArtesanos[2]} />
              </div>
              <div />
              <div>
                <SponsorCard {...sponsors.maestrosArtesanos[3]} />
              </div>
            </div>

            {/* Fila 2 */}
            <div className="sponsors-grid__maestros-row sponsors-grid__maestros-row--2">
              <div />
              <div>
                <SponsorCard {...sponsors.maestrosArtesanos[4]} />
              </div>
              <div />
              <div>
                <SponsorCard {...sponsors.maestrosArtesanos[5]} />
              </div>
              <div />
              <div>
                <SponsorCard {...sponsors.maestrosArtesanos[6]} />
              </div>
              <div />
              <div>
                <SponsorCard {...sponsors.maestrosArtesanos[7]} />
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
