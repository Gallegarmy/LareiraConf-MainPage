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
  return (
    <div
      className="portrait-frame"
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Ver detalles de ${speaker.name}`}
    >
      <CornerFlourish position="top-left" />
      <CornerFlourish position="top-right" />
      <CornerFlourish position="bottom-left" />
      <CornerFlourish position="bottom-right" />

      <div className="portrait-frame__image-container">
        <img
          src={speaker.image.src}
          alt={speaker.image.alt}
          className="portrait-frame__image"
          loading="lazy"
        />
      </div>

      <div className="portrait-frame__nameplate">
        <span className="portrait-frame__name">{speaker.name}</span>
        <span className="portrait-frame__role">{speaker.role}</span>
      </div>
    </div>
  );
};

export default PortraitFrame;
