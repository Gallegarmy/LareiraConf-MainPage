import React, { useMemo } from "react";
import type { TeamMember } from "./team-types";
import { normalizeLabel, renderSocialIcon } from "./social-icons";

type TeamMemberCardProps = {
  member: TeamMember;
  isActive: boolean;
  isMobileView: boolean;
  registerCard: (memberId: string) => (node: HTMLElement | null) => void;
  onActivate: (memberId: string) => void;
  onDeactivate: (memberId: string) => void;
  onToggle: (memberId: string) => void;
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  isActive,
  isMobileView,
  registerCard,
  onActivate,
  onDeactivate,
  onToggle,
}) => {
  const registerRef = useMemo(
    () => registerCard(member.id),
    [member.id, registerCard],
  );

  const linkedInSocial = member.socials.find(
    (social) => normalizeLabel(social.label) === "linkedin",
  );
  const otherSocials = member.socials.filter(
    (social) => normalizeLabel(social.label) !== "linkedin",
  );

  const cardClasses = ["character-card"];
  if (isActive) {
    cardClasses.push("card-active");
  }
  if (member.mirrored) {
    cardClasses.push("mirrored");
  }

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    const nextTarget = event.relatedTarget as HTMLElement | null;
    if (!event.currentTarget.contains(nextTarget) && !isMobileView) {
      onDeactivate(member.id);
    }
  };

  return (
    <article
      data-member-id={member.id}
      className={cardClasses.join(" ")}
      ref={registerRef}
      onMouseEnter={() => {
        if (!isMobileView) {
          onActivate(member.id);
        }
      }}
      onMouseLeave={() => {
        if (!isMobileView) {
          onDeactivate(member.id);
        }
      }}
      onFocusCapture={() => onActivate(member.id)}
      onBlurCapture={handleBlur}
    >
      <button
        type="button"
        className="character-button"
        onClick={() => {
          if (!isMobileView) {
            onToggle(member.id);
          }
        }}
        aria-label={member.name}
        aria-expanded={isActive}
        aria-controls={`member-tooltip-${member.id}`}
        aria-describedby={isActive ? `member-tooltip-${member.id}` : undefined}
        aria-haspopup="dialog"
      >
        {member.image ? (
          <img
            src={member.image.src}
            alt={member.image.alt}
            className="character-image"
            loading="lazy"
          />
        ) : (
          <span className="character-placeholder">{member.initials}</span>
        )}
        <span className="character-shadow" aria-hidden="true" />
      </button>

      <div
        id={`member-tooltip-${member.id}`}
        role="dialog"
        className="character-tooltip"
        aria-hidden={!isActive}
      >
        <div className="character-tooltip-header">
          <div className="character-tooltip-title">
            <h3>{member.name}</h3>
            {linkedInSocial && (
              <a
                href={linkedInSocial.url}
                target="_blank"
                rel="noreferrer"
                className="character-linkedin-link"
                aria-label={`LinkedIn de ${member.name}`}
              >
                {renderSocialIcon(linkedInSocial.label)}
              </a>
            )}
          </div>
          <p className="character-role">{member.role}</p>
        </div>
        <p>{member.bio}</p>
        {otherSocials.length > 0 && (
          <div className="character-socials">
            {otherSocials.map((social) => (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noreferrer"
              >
                {renderSocialIcon(social.label)}
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default TeamMemberCard;
