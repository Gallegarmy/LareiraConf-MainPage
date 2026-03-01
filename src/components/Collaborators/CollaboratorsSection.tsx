import React from "react";
import "./CollaboratorsSection.scss";
import { collaborators } from "./collaborators-data";
import FireParticles from "@components/Others/FireParticles";
import tabernBg from "@img/parallax/tabern.png";
import { useTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/utils";

interface CollaboratorsSectionProps {
  lang?: Locale;
}

// Colores medievales para los banderines (rota por índice)
const PENNANT_COLORS = [
  "#8B1A1A", // rojo oscuro
  "#1A3A5C", // azul marino
  "#2D5A1B", // verde bosque
  "#5C3A0A", // marrón dorado
  "#4A1A5C", // púrpura
  "#1A4A3A", // verde esmeralda
];

// Número de banderines de placeholder cuando no hay colaboradores
const PLACEHOLDER_COUNT = 6;

type PennantItem =
  | { id: string; placeholder: true; color: string; delay: number }
  | {
      id: string;
      placeholder: false;
      color: string;
      delay: number;
      collaborator: (typeof collaborators)[number];
    };

const CollaboratorsSection: React.FC<CollaboratorsSectionProps> = ({
  lang = "es",
}) => {
  const t = useTranslations(lang);
  const isEmpty = collaborators.length === 0;

  const pennants: PennantItem[] = isEmpty
    ? Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => ({
        id: `placeholder-${i}`,
        placeholder: true as const,
        color: PENNANT_COLORS[i % PENNANT_COLORS.length],
        delay: i * 0.18,
      }))
    : collaborators.map((c, i) => ({
        id: c.id,
        placeholder: false as const,
        color: PENNANT_COLORS[i % PENNANT_COLORS.length],
        delay: i * 0.18,
        collaborator: c,
      }));

  return (
    <section className="panel collaborators-section" id="colaboradores">
      <div className="collaborators-section__background">
        <div className="collaborators-section__bg-layer">
          <img
            src={tabernBg.src}
            alt="Taberna medieval"
            className="collaborators-section__backdrop-img"
          />
        </div>
        <div className="collaborators-section__particles">
          <FireParticles count={40} />
        </div>
      </div>

      <div className="collaborators-section__overlay" />

      <div className="collaborators-section__content">
        <h2 className="collaborators-section__title">
          {t("collaborators.title")}
        </h2>

        <div className="collaborators-section__intro">
          <p>{t("collaborators.description")}</p>
        </div>

        {/* Tira de banderines */}
        <div className="bunting">
          {/* Cuerda SVG con catenaria */}
          <svg
            className="bunting__rope-svg"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,10 Q250,50 500,10 Q750,50 1000,10"
              stroke="#8B6914"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {/* Nudos en los puntos de anclaje de cada banderín */}
            {pennants.map((_, i) => {
              const x = ((i + 0.5) / pennants.length) * 1000;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={10 + Math.sin((x / 1000) * Math.PI) * 40}
                  r="4"
                  fill="#6B4F10"
                />
              );
            })}
          </svg>

          {/* Banderines */}
          <div className="bunting__pennants">
            {pennants.map((p, i) => (
              <div
                key={p.id}
                className="pennant"
                style={
                  {
                    "--pennant-color": p.color,
                    "--sway-delay": `${p.delay}s`,
                    "--sway-dir": i % 2 === 0 ? "1" : "-1",
                  } as React.CSSProperties
                }
              >
                {/* Clip de anclaje a la cuerda */}
                <div className="pennant__clip" aria-hidden="true" />

                {p.placeholder === true ? (
                  <div className="pennant__fabric pennant__fabric--placeholder" />
                ) : (
                  <a
                    href={p.collaborator.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pennant__fabric pennant__fabric--linked"
                    aria-label={`${t("collaborators.visitLabel")} ${p.collaborator.name}`}
                  >
                    <img
                      src={p.collaborator.logo}
                      alt={p.collaborator.alt}
                      className="pennant__logo"
                      loading="lazy"
                    />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaboratorsSection;
