import React from "react";
import type { Speaker } from "./speakers-types";
import CornerFlourish from "../CornerFlourish/CornerFlourish";

interface PortraitFrameProps {
  speaker: Speaker;
  rotation: number;
  onClick: () => void;
}

const PortraitFrame: React.FC<PortraitFrameProps> = ({
  speaker,
  rotation,
  onClick,
}) => {
  const isRevealed = speaker.isRevealed !== false; // Por defecto true si no se especifica
  const isMultiSpeaker = speaker.isMultiSpeaker && speaker.speakers;
  const colSpan = speaker.colSpan || 1;

  return (
    <div
      className={`portrait-frame ${!isRevealed ? "portrait-frame--unrevealed" : ""} ${isMultiSpeaker ? "portrait-frame--multi" : ""}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
      }}
      onClick={isRevealed ? onClick : undefined}
      role={isRevealed ? "button" : undefined}
      tabIndex={isRevealed ? 0 : -1}
      onKeyDown={
        isRevealed
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      aria-label={
        isRevealed
          ? `Ver detalles de ${speaker.name}`
          : "Ponente aún no revelado"
      }
    >
      <CornerFlourish position="top-left" />
      <CornerFlourish position="top-right" />
      <CornerFlourish position="bottom-left" />
      <CornerFlourish position="bottom-right" />

      <div className="portrait-frame__image-container">
        {isMultiSpeaker && speaker.speakers ? (
          <div className="portrait-frame__multi-images">
            {speaker.speakers.map((subSpeaker, index) => (
              <img
                key={index}
                src={subSpeaker.image.src}
                alt={subSpeaker.image.alt}
                className="portrait-frame__image--multi"
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <img
            src={speaker.image.src}
            alt={speaker.image.alt}
            className="portrait-frame__image--single"
            loading="lazy"
          />
        )}
      </div>

      <div className="portrait-frame__nameplate">
        <span className="portrait-frame__name">
          {isRevealed ? speaker.name : "############"}
        </span>
        <span className="portrait-frame__role">
          {isRevealed ? speaker.tema || speaker.role : "############"}
        </span>
      </div>
    </div>
  );
};

export default PortraitFrame;
