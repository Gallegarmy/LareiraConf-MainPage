import React from "react";
import "./CollaboratorsSection.scss";
import { collaborators } from "./collaborators-data";

const PLACEHOLDER_COUNT = 6;

type PennantItem =
  | { id: string; placeholder: true; delay: number }
  | {
      id: string;
      placeholder: false;
      delay: number;
      collaborator: (typeof collaborators)[number];
    };

const CollaboratorsBunting: React.FC = () => {
  const isEmpty = collaborators.length === 0;

  const pennants: PennantItem[] = isEmpty
    ? Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => ({
        id: `placeholder-${i}`,
        placeholder: true as const,
        delay: i * 0.18,
      }))
    : collaborators.map((c, i) => ({
        id: c.id,
        placeholder: false as const,
        delay: i * 0.18,
        collaborator: c,
      }));

  // Calcula la y exacta de la Bézier cuadrática M0,10 Q250,50 500,10 Q750,50 1000,10
  const ropeY = (x: number): number => {
    const t = x <= 500 ? x / 500 : (x - 500) / 500;
    // y(t) = (1-t)²·10 + 2t(1-t)·50 + t²·10 = 10 + 80t - 80t²
    return 10 + 80 * t - 80 * t * t;
  };

  return (
    <div className="collaborators-bunting-block">
      <div className="bunting">
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
          {pennants.map((_, i) => {
            const x = ((i + 0.5) / pennants.length) * 1000;
            return <circle key={i} cx={x} cy={ropeY(x)} r="4" fill="#6B4F10" />;
          })}
        </svg>
        {pennants.map((p, i) => {
          const xSvg = ((i + 0.5) / pennants.length) * 1000;
          const ySvg = ropeY(xSvg);
          const leftPct = ((i + 0.5) / pennants.length) * 100;
          return (
            <div
              key={p.id}
              className="pennant"
              style={
                {
                  left: `${leftPct}%`,
                  top: `${ySvg - 5}px`,
                  "--sway-delay": `${p.delay}s`,
                  "--sway-dir": i % 2 === 0 ? "1" : "-1",
                } as React.CSSProperties
              }
            >
              <div className="pennant__clip" aria-hidden="true" />

              {p.placeholder === true ? (
                <div className="pennant__fabric pennant__fabric--placeholder" />
              ) : (
                <a
                  href={p.collaborator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pennant__fabric pennant__fabric--linked"
                  aria-label={`Visitar ${p.collaborator.name}`}
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
          );
        })}{" "}
      </div>
    </div>
  );
};

export default CollaboratorsBunting;
