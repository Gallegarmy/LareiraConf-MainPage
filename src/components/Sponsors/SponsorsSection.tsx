import React from "react";
import FireflyParticles from "@components/Others/FireflyParticles";
import sponsorsBg from "@img/parallax/sponsors-bg.png";
import { useTranslations, type Locale } from "@/i18n/utils";
import "@styles/sponsors.css";

// Importar logos
import dinahostingLogo from "@img/sponsors/dinahosting.svg";
import raiolaLogo from "@img/sponsors/raiola.svg";
import denodoLogo from "@img/sponsors/denodo.svg";
import wordpressLogo from "@img/sponsors/wordpress.svg";
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
    url: "https://dinahosting.com",
  },
  maestrosArtesanos: [
    {
      name: "Raiola",
      tier: "maestro-artesano",
      logo: raiolaLogo.src,
      avatar: "/images/tickets/guerreros.png",
      url: "https://raiolanetworks.es",
    },
    {
      name: "Denodo",
      tier: "maestro-artesano",
      logo: denodoLogo.src,
      avatar: "/images/tickets/guerreros.png",
      url: "https://www.denodo.com",
    },
    {
      name: "WordPress.com",
      tier: "maestro-artesano",
      logo: wordpressLogo.src,
      avatar: "/images/tickets/guerreros.png",
      url: "https://wordpress.com/es/academia/",
    },
    {
      name: "Gradiant",
      tier: "maestro-artesano",
      logo: gradiantLogo.src,
      avatar: "/images/tickets/guerreros.png",
      url: "https://www.gradiant.org",
    },
    {
      name: "Docuten",
      tier: "maestro-artesano",
      logo: docutenLogo.src,
      avatar: "/images/tickets/guerreros.png",
      url: "https://www.docuten.com",
    },
    {
      name: "NextDigital",
      tier: "maestro-artesano",
      logo: nextdigitalLogo.src,
      avatar: "/images/tickets/guerreros.png",
      url: "https://nextdigital.es",
    },
    {
      name: "Accenture",
      tier: "maestro-artesano",
      logo: null,
      avatar: "/images/tickets/guerreros.png",
      url: "https://www.accenture.com",
    },
    {
      name: "NttData",
      tier: "maestro-artesano",
      logo: null,
      avatar: "/images/tickets/guerreros.png",
      url: "https://www.nttdata.com",
    },
  ],
  oficialesArtesanos: [
    {
      name: "Teimas",
      tier: "oficial-artesano",
      logo: teimasLogo.src,
      avatar: "/images/tickets/aventureros.png",
      url: "https://www.teimas.com",
    },
    {
      name: "Captology",
      tier: "oficial-artesano",
      logo: captologyLogo.src,
      avatar: "/images/tickets/aventureros.png",
      url: "https://captology.es",
    },
    {
      name: "Kelea",
      tier: "oficial-artesano",
      logo: keleaLogo.src,
      avatar: "/images/tickets/aventureros.png",
      url: "https://kelea.es",
    },
    {
      name: "?",
      tier: "oficial-artesano",
      logo: null,
      avatar: "/images/tickets/aventureros.png",
      url: undefined,
    },
  ],
};

import tendretePeq from "@img/sponsors/tenderete-peq.png";
import tendereteMid from "@img/sponsors/tenderete-mid.png";
import tendereteGran from "@img/sponsors/tenderete-gran.png";

interface SponsorCardProps {
  name: string;
  tier: string;
  logo?: string | null;
  avatar?: string | null;
  url?: string;
}

const getTendereteImage = (tier: string) => {
  switch (tier) {
    case "gran-maestro":
      return tendereteGran.src;
    case "oficial-artesano":
      return tendretePeq.src;
    case "maestro-artesano":
      return tendereteMid.src;
    default:
      return tendereteMid.src;
  }
};

const SponsorCard: React.FC<SponsorCardProps> = ({ name, tier, logo, url }) => {
  const content = (
    <div className="sponsor-card__tenderete">
      <img
        src={getTendereteImage(tier)}
        alt=""
        className="sponsor-card__tenderete-img"
      />
      <div className="sponsor-card__logo-container">
        {logo ? (
          <img src={logo} alt={name} className="sponsor-card__logo" />
        ) : (
          <div className="sponsor-card__logo-placeholder">?</div>
        )}
      </div>
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`sponsor-card sponsor-card--${tier}`}
        aria-label={`Visitar web de ${name}`}
      >
        {content}
      </a>
    );
  }

  return <div className={`sponsor-card sponsor-card--${tier}`}>{content}</div>;
};

const SponsorsSection: React.FC<{ lang: string }> = ({ lang }) => {
  const t = useTranslations(lang as Locale);

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
          <FireflyParticles count={30} />
        </div>
      </div>

      <div className="sponsors-content">
        <div className="sponsors-section__sign">
          <h2 className="sponsors-section__sign-text">{t("sponsors.title")}</h2>
          <div className="sponsors-section__description">
            <p>{t("sponsors.description")}</p>
          </div>
        </div>

        <div className="sponsors-grid">
          {/* Maestros Artesanos - Al fondo */}
          <div className="sponsors-grid__maestros">
            <div className="sponsors-grid__maestros-row sponsors-grid__maestros-row--1">
              <SponsorCard {...sponsors.maestrosArtesanos[0]} />
              <SponsorCard {...sponsors.maestrosArtesanos[1]} />
              <SponsorCard {...sponsors.maestrosArtesanos[2]} />
            </div>
            <div className="sponsors-grid__maestros-row sponsors-grid__maestros-row--2">
              <SponsorCard {...sponsors.maestrosArtesanos[3]} />
              <SponsorCard {...sponsors.maestrosArtesanos[4]} />
              <SponsorCard {...sponsors.maestrosArtesanos[5]} />
              <SponsorCard {...sponsors.maestrosArtesanos[6]} />
            </div>
          </div>

          {/* Oficiales + Gran Maestro - Primer plano */}
          <div className="sponsors-grid__foreground">
            <div className="sponsors-grid__oficial-left">
              <SponsorCard {...sponsors.oficialesArtesanos[0]} />
              <SponsorCard {...sponsors.oficialesArtesanos[1]} />
            </div>

            <div className="sponsors-grid__gran-maestro">
              <SponsorCard {...sponsors.granMaestro} />
            </div>

            <div className="sponsors-grid__oficial-right">
              <SponsorCard {...sponsors.oficialesArtesanos[2]} />
              <SponsorCard {...sponsors.oficialesArtesanos[3]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
