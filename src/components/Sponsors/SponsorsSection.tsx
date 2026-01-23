import React from "react";
import FireflyParticles from "@components/Others/FireflyParticles";
import sponsorsBg from "@img/parallax/sponsors-bg.png";
import { useTranslations, type Locale } from "@/i18n/utils";
import "@styles/sponsors.css";

// Importar avatar
import aventureroAvatar from "@img/assets/aventurero.png";

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
    avatar: aventureroAvatar.src,
    url: "https://dinahosting.com",
  },
  maestrosArtesanos: [
    {
      name: "NextDigital",
      tier: "maestro-artesano",
      logo: nextdigitalLogo.src,
      avatar: aventureroAvatar.src,
      url: "https://nextdigital.es",
    },
    {
      name: "?",
      tier: "maestro-artesano",
      logo: null,
      avatar: aventureroAvatar.src,
      url: undefined,
    },
    {
      name: "?",
      tier: "maestro-artesano",
      logo: null,
      avatar: aventureroAvatar.src,
      url: undefined,
    },
    {
      name: "?",
      tier: "maestro-artesano",
      logo: null,
      avatar: aventureroAvatar.src,
      url: undefined,
    },
    {
      name: "WordPress.com",
      tier: "maestro-artesano",
      logo: wordpressLogo.src,
      avatar: aventureroAvatar.src,
      url: "https://wordpress.com/es/academia/",
    },
    {
      name: "Raiola",
      tier: "maestro-artesano",
      logo: raiolaLogo.src,
      avatar: aventureroAvatar.src,
      url: "https://raiolanetworks.es",
    },
    {
      name: "Denodo",
      tier: "maestro-artesano",
      logo: denodoLogo.src,
      avatar: aventureroAvatar.src,
      url: "https://www.denodo.com",
    },
    {
      name: "Docuten",
      tier: "maestro-artesano",
      logo: docutenLogo.src,
      avatar: aventureroAvatar.src,
      url: "https://www.docuten.com",
    },
    {
      name: "Gradiant",
      tier: "maestro-artesano",
      logo: gradiantLogo.src,
      avatar: aventureroAvatar.src,
      url: "https://www.gradiant.org",
    },
  ],
  oficialesArtesanos: [
    {
      name: "Captology",
      tier: "oficial-artesano",
      logo: captologyLogo.src,
      avatar: aventureroAvatar.src,
      url: "https://captology.es",
    },
    {
      name: "Teimas",
      tier: "oficial-artesano",
      logo: teimasLogo.src,
      avatar: aventureroAvatar.src,
      url: "https://www.teimas.com",
    },
    {
      name: "Kelea",
      tier: "oficial-artesano",
      logo: keleaLogo.src,
      avatar: aventureroAvatar.src,
      url: "https://kelea.es",
    },
    {
      name: "?",
      tier: "oficial-artesano",
      logo: null,
      avatar: aventureroAvatar.src,
      url: "https://lareiraconfsponsordeck.my.canva.site/",
      customText:
        "¿Quieres montar tu puesto? Consulta el dossier de patrocinio",
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
  index?: number;
  customText?: string;
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

const SponsorCard: React.FC<SponsorCardProps> = ({
  name,
  tier,
  logo,
  url,
  avatar,
  index = 0,
  customText,
}) => {
  // Alternar lado del muñeco según el índice (para maestros y oficiales)
  let characterSide =
    tier !== "gran-maestro" && index % 2 === 0 ? "left" : "right";

  const isInactive = !logo && !customText;
  const cardClasses = `sponsor-card sponsor-card--${tier}${isInactive ? " sponsor-card--inactive" : ""}`;

  const content = (
    <div className="sponsor-card__content">
      {avatar && logo && (
        <>
          {tier === "gran-maestro" ? (
            <>
              <img
                src={avatar}
                alt=""
                className="sponsor-card__character sponsor-card__character--left"
              />
              <img
                src={avatar}
                alt=""
                className="sponsor-card__character sponsor-card__character--right"
              />
            </>
          ) : (
            <img
              src={avatar}
              alt=""
              className={`sponsor-card__character sponsor-card__character--${characterSide}`}
            />
          )}
        </>
      )}
      {customText ? (
        <div className="sponsor-card__cartel">
          <div className="sponsor-card__cartel-content">
            <div className="sponsor-card__custom-text">{customText}</div>
          </div>
        </div>
      ) : (
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
              <div className="sponsor-card__logo-placeholder"></div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
        aria-label={`Visitar web de ${name}`}
      >
        {content}
      </a>
    );
  }

  return <div className={cardClasses}>{content}</div>;
};

const SponsorsSection: React.FC<{ lang: string }> = ({ lang }) => {
  const t = useTranslations(lang as Locale);

  console.log("🔥 SponsorsSection rendering", { lang, sponsors });
  console.log("📍 Sponsors title:", t("sponsors.title"));
  console.log("📍 Sponsors description:", t("sponsors.description"));

  return (
    <section
      id="sponsors"
      className="panel sponsors-section"
      data-section="sponsors"
    >
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
              <SponsorCard {...sponsors.maestrosArtesanos[0]} index={0} />
              <SponsorCard {...sponsors.maestrosArtesanos[1]} index={1} />
              <SponsorCard {...sponsors.maestrosArtesanos[2]} index={2} />
              <SponsorCard {...sponsors.maestrosArtesanos[3]} index={3} />
              <SponsorCard {...sponsors.maestrosArtesanos[4]} index={4} />
            </div>
            <div className="sponsors-grid__maestros-row sponsors-grid__maestros-row--2">
              <SponsorCard {...sponsors.maestrosArtesanos[5]} index={5} />
              <SponsorCard {...sponsors.maestrosArtesanos[6]} index={6} />
              <SponsorCard {...sponsors.maestrosArtesanos[7]} index={7} />
              <SponsorCard {...sponsors.maestrosArtesanos[8]} index={8} />
            </div>
          </div>

          {/* Oficiales + Gran Maestro - Primer plano */}
          <div className="sponsors-grid__foreground">
            <div className="sponsors-grid__oficial-left">
              <SponsorCard {...sponsors.oficialesArtesanos[0]} index={0} />
              <SponsorCard {...sponsors.oficialesArtesanos[1]} index={1} />
            </div>

            <div className="sponsors-grid__gran-maestro">
              <SponsorCard {...sponsors.granMaestro} />
            </div>

            <div className="sponsors-grid__oficial-right">
              <SponsorCard {...sponsors.oficialesArtesanos[2]} index={2} />
              <SponsorCard {...sponsors.oficialesArtesanos[3]} index={3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
