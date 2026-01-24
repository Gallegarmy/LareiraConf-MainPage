import React from "react";
import type { SponsorConfig } from "./sponsorsData";
import { getCharacterSrc } from "./sponsorsData";

interface SponsorCardProps {
  sponsor: SponsorConfig;
  index: number;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, index }) => {
  const {
    name,
    tier,
    logo,
    url,
    customText,
    tenderete,
    character,
    charactersGranMaestro,
  } = sponsor;

  // Determinar estilo del personaje
  let characterStyle: React.CSSProperties = {};
  if (character) {
    const { variation, side } = character;
    
    // Construir transformación completa
    const transforms = [];
    
    // Si está centrado, necesita translateX
    if (side === "center") {
      transforms.push("translateX(-50%)");
    }
    
    // Añadir rotación si existe
    if (variation.rotate !== 0) {
      transforms.push(`rotate(${variation.rotate}deg)`);
    }
    
    // Añadir escala si existe
    if (variation.scale !== 1) {
      transforms.push(`scale(${variation.scale})`);
    }
    
    // Añadir flip si existe
    if (variation.flip) {
      transforms.push("scaleX(-1)");
    }
    
    if (transforms.length > 0) {
      characterStyle = {
        transform: transforms.join(" "),
      };
    }
  }

  const isInactive = !logo && !customText;
  const cardClasses = `sponsor-card sponsor-card--${tier}${isInactive ? " sponsor-card--inactive" : ""}`;

  const content = (
    <div className="sponsor-card__content">
      {logo && (
        <>
          {tier === "gran-maestro" && charactersGranMaestro ? (
            <>
              <img
                src={charactersGranMaestro.left}
                alt=""
                className="sponsor-card__character sponsor-card__character--left"
              />
              <img
                src={charactersGranMaestro.right}
                alt=""
                className="sponsor-card__character sponsor-card__character--right"
                style={{ transform: "scaleX(-1)" }}
              />
            </>
          ) : character ? (
            <img
              src={getCharacterSrc(character.type, tier)}
              alt=""
              className={`sponsor-card__character sponsor-card__character--${character.side}`}
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
          <img src={tenderete} alt="" className="sponsor-card__tenderete-img" />
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

export default SponsorCard;
