import React from "react";
import FireflyParticles from "@components/Others/FireflyParticles";
import sponsorsBg from "@img/parallax/sponsors-bg.png";
import { useTranslations, type Locale } from "@/i18n/utils";
import "@styles/sponsors.css";

// Importar personajes
import granMaestroH from "@img/sponsors/gran-maestro-h.png";
import granMaestroM from "@img/sponsors/gran-maestro-m.png";
import artesanoH from "@img/sponsors/artesano-h.png";
import artesanoM from "@img/sponsors/artesano-m.png";
import oficialH from "@img/sponsors/oficial-h.png";
import oficialM from "@img/sponsors/oficial-m.png";

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
    avatarLeft: granMaestroM.src,
    avatarRight: granMaestroH.src,
    url: "https://dinahosting.com",
  },
  maestrosArtesanos: [
    {
      name: "NextDigital",
      tier: "maestro-artesano",
      logo: nextdigitalLogo.src,
      url: "https://nextdigital.es",
    },
    {
      name: "?",
      tier: "maestro-artesano",
      logo: null,
      url: undefined,
    },
    {
      name: "?",
      tier: "maestro-artesano",
      logo: null,
      url: undefined,
    },
    {
      name: "?",
      tier: "maestro-artesano",
      logo: null,
      url: undefined,
    },
    {
      name: "WordPress.com",
      tier: "maestro-artesano",
      logo: wordpressLogo.src,
      url: "https://wordpress.com/es/academia/",
    },
    {
      name: "Raiola",
      tier: "maestro-artesano",
      logo: raiolaLogo.src,
      url: "https://raiolanetworks.es",
    },
    {
      name: "Denodo",
      tier: "maestro-artesano",
      logo: denodoLogo.src,
      url: "https://www.denodo.com",
    },
    {
      name: "Docuten",
      tier: "maestro-artesano",
      logo: docutenLogo.src,
      url: "https://www.docuten.com",
    },
    {
      name: "Gradiant",
      tier: "maestro-artesano",
      logo: gradiantLogo.src,
      url: "https://www.gradiant.org",
    },
  ],
  oficialesArtesanos: [
    {
      name: "Captology",
      tier: "oficial-artesano",
      logo: captologyLogo.src,
      url: "https://captology.es",
    },
    {
      name: "Teimas",
      tier: "oficial-artesano",
      logo: teimasLogo.src,
      url: "https://www.teimas.com",
    },
    {
      name: "Kelea",
      tier: "oficial-artesano",
      logo: keleaLogo.src,
      url: "https://kelea.es",
    },
    {
      name: "?",
      tier: "oficial-artesano",
      logo: null,
      url: "https://lareiraconfsponsordeck.my.canva.site/",
      customText:
        "¿Quieres montar tu puesto? Consulta el dossier de patrocinio",
    },
  ],
};

import tendretePeq from "@img/sponsors/tenderete-peq.png";
import tendereteG from "@img/sponsors/tenderete-g.png";
import tendereteM1 from "@img/sponsors/tenderete-m1.png";
import tendereteM2 from "@img/sponsors/tenderete-m2.png";
import tendereteM3 from "@img/sponsors/tenderete-m3.png";
import tendereteM4 from "@img/sponsors/tenderete-m4.png";
import tendereteM5 from "@img/sponsors/tenderete-m5.png";

const tenderetesMaestros = [
  tendereteM1.src,
  tendereteM2.src,
  tendereteM3.src,
  tendereteM4.src,
  tendereteM5.src,
];

// Mapa de índices a tenderetes específicos (para casos especiales)
const tendereteOverrides: Record<number, string> = {
  5: tendereteM3.src, // Raiola (índice 5) usa tenderete 3
  6: tendereteM1.src, // Denodo (índice 6) usa tenderete 1
};

// Mapa de índices a lados específicos para maestros artesanos
const characterSideOverrides: Record<number, "left" | "right"> = {
  6: "left", // Denodo a la izquierda
};

// Mapa de índices a avatares específicos
const characterAvatarOverrides: Record<number, string> = {
  5: artesanoH.src, // Raiola (5) intercambio con Denodo
  6: artesanoM.src, // Denodo (6) intercambio con Raiola
  7: artesanoH.src, // Docuten (7) intercambio con Gradiant
  8: artesanoM.src, // Gradiant (8) intercambio con Docuten
};

const getRandomArtesanoAvatar = (index: number) => {
  return index % 2 === 0 ? artesanoH.src : artesanoM.src;
};

const getArtesanoVariations = (index: number) => {
  // Generar variaciones basadas en el índice para que sean consistentes
  const variations = [
    { rotate: 2, scale: 1.0, flip: false },
    { rotate: -3, scale: 1.05, flip: true },
    { rotate: 1, scale: 0.98, flip: false },
    { rotate: -2, scale: 1.02, flip: false },
    { rotate: 3, scale: 1.0, flip: true },
    { rotate: -1, scale: 1.03, flip: false },
    { rotate: 2, scale: 0.99, flip: true }, // Denodo (índice 6) - sin voltear
    { rotate: -2, scale: 1.01, flip: false },
    { rotate: 1, scale: 1.04, flip: false },
  ];
  return variations[index % variations.length];
};

const getRandomTendereteMaestro = (index: number) => {
  // Si hay un override para este índice, usarlo
  if (tendereteOverrides[index]) {
    return tendereteOverrides[index];
  }
  return tenderetesMaestros[index % tenderetesMaestros.length];
};

interface SponsorCardProps {
  name: string;
  tier: string;
  logo?: string | null;
  avatar?: string | null;
  avatarLeft?: string | null;
  avatarRight?: string | null;
  url?: string;
  index?: number;
  customText?: string;
}

const getTendereteImage = (tier: string, index?: number) => {
  switch (tier) {
    case "gran-maestro":
      return tendereteG.src;
    case "oficial-artesano":
      return tendretePeq.src;
    case "maestro-artesano":
      return index !== undefined
        ? getRandomTendereteMaestro(index)
        : tendereteM1.src;
    default:
      return tendereteM1.src;
  }
};

const SponsorCard: React.FC<SponsorCardProps> = ({
  name,
  tier,
  logo,
  url,
  avatar,
  avatarLeft,
  avatarRight,
  index = 0,
  customText,
}) => {
  // Determinar lado del muñeco según el tier
  let characterSide = "left";
  if (tier === "maestro-artesano") {
    // Verificar si hay un override para este índice
    if (characterSideOverrides[index]) {
      characterSide = characterSideOverrides[index];
    } else {
      // En mobile: impares a la izquierda, pares a la derecha
      characterSide = index % 2 === 0 ? "right" : "left";
    }
  } else if (tier === "oficial-artesano") {
    characterSide = index % 2 === 0 ? "right" : "left";
  }

  // Determinar avatar según el tier
  let characterAvatar = avatar;
  let characterStyle: React.CSSProperties = {};

  if (tier === "maestro-artesano" && logo) {
    // Verificar si hay un override para el avatar
    if (characterAvatarOverrides[index]) {
      characterAvatar = characterAvatarOverrides[index];
    } else {
      characterAvatar = getRandomArtesanoAvatar(index);
    }
    const variations = getArtesanoVariations(index);
    characterStyle = {
      transform: `rotate(${variations.rotate}deg) scale(${variations.scale})${variations.flip ? " scaleX(-1)" : ""}`,
    };
  } else if (tier === "oficial-artesano" && logo) {
    characterAvatar = index % 2 === 0 ? oficialH.src : oficialM.src;
  }

  const isInactive = !logo && !customText;
  const cardClasses = `sponsor-card sponsor-card--${tier}${isInactive ? " sponsor-card--inactive" : ""}`;

  const content = (
    <div className="sponsor-card__content">
      {logo && (
        <>
          {tier === "gran-maestro" && avatarLeft && avatarRight ? (
            <>
              <img
                src={avatarLeft}
                alt=""
                className="sponsor-card__character sponsor-card__character--left"
              />
              <img
                src={avatarRight}
                alt=""
                className="sponsor-card__character sponsor-card__character--right"
                style={{ transform: "scaleX(-1)" }}
              />
            </>
          ) : characterAvatar ? (
            <img
              src={characterAvatar}
              alt=""
              className={`sponsor-card__character sponsor-card__character--${characterSide}`}
              style={characterStyle}
            />
          ) : null}
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
            src={getTendereteImage(tier, index)}
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
