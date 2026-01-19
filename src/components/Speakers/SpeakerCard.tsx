import React from "react";
import { renderSocialIcon } from "@components/Team/social-icons";
import type { Speaker } from "./speakers-types";

type SpeakerCardProps = {
  speaker: Speaker;
  side: "left" | "right" | "single";
};

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, side }) => (
  <article className={`speaker-card speaker-card--${side}`}>
    <div className="speaker-card__image-frame" aria-hidden="true">
      <div className="speaker-card__image-wrapper">
        <img
          src={speaker.image.src}
          alt={speaker.image.alt}
          loading="lazy"
          className="speaker-card__image"
        />
      </div>
    </div>

    <div className="speaker-card__content">
      <h3 className="speaker-card__name">{speaker.name}</h3>
      <p className="speaker-card__role">{speaker.role}</p>
      <p className="speaker-card__talk">{speaker.talkTitle}</p>
      <p className="speaker-card__summary">{speaker.summary}</p>

      {speaker.socials && speaker.socials.length > 0 && (
        <ul className="speaker-card__socials">
          {speaker.socials.map((social) => (
            <li key={`${speaker.id}-${social.url}`}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="speaker-card__social-link"
                aria-label={`${social.label} de ${speaker.name}`}
              >
                {renderSocialIcon(social.label)}
                <span>{social.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  </article>
);

export default SpeakerCard;
