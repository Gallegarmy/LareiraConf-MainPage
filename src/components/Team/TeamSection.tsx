import React, { useCallback, useEffect, useRef, useState } from "react";
import ParallaxLayer from "@components/Parallax/ParallaxLayer";
import FireParticles from "@components/Others/FireParticles";

import campBackdrop from "@img/parallax/team-camp.png";
import nachoImg from "@img/crew/Nacho.png";
import jesusImg from "@img/crew/Yisus.png";
import andreaImg from "@img/crew/Andrea.png";
import tiziImg from "@img/crew/Tizi.png";
import sysarmyIcon from "@img/crew/sysarmy.svg?url";
import pythonIcon from "@img/crew/python.svg?url";
import corunawtfIcon from "@img/crew/corunawtf.svg?url";
import "@styles/team.css";

type SocialLink = {
  label: string;
  url: string;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: { src: string; alt: string };
  initials?: string;
  mirrored?: boolean;
  socials: SocialLink[];
};

const crewMembers: TeamMember[] = [
  {
    id: "nacho",
    name: "Nacho Espósito",
    role: "Founder · DevOps",
    bio: "Apasionado por la tecnología y el desarrollo de soluciones digitales. He ayudado a traer Sysarmy a Galicia. Es el culpable de que estemos aquí.",
    image: { src: nachoImg.src, alt: "Retrato pixel art de Nacho" },
    socials: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/ignacioespositobusto",
      },
    ],
  },
  {
    id: "andrea",
    name: "Andrea Magán",
    role: "Host · Frontend dev",
    bio: "Diseña experiencias con mimo y a también las programa. Lleva el micrófono y anima el campamento.",
    image: { src: andreaImg.src, alt: "Retrato pixel art de Andrea" },
    socials: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/andreamaganrey" },
    ],
  },
  {
    id: "yisus",
    name: "Jesús Pérez-Roca",
    role: "Beerworking · Profesor",
    bio: "Profesor experimentado. No se pierde un evento tech en Galicia y siempre está dispuesto a compartir una buena cerveza.",
    image: { src: jesusImg.src, alt: "Retrato pixel art de Yisus" },
    mirrored: true,
    socials: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jesusperezrocafernandez",
      },
    ],
  },
  {
    id: "tizi",
    name: "Tiziana Amicarella",
    role: "Tesorera · Backend dev",
    bio: "Coordina y maneja las cuentas. Tanto te maneja una base de datos como te monta un evento. Swiftie hasta la médula.",
    image: { src: tiziImg.src, alt: "Retrato pixel art de Tizi" },
    initials: "TZ",
    mirrored: true,
    socials: [{ label: "LinkedIn", url: "https://www.linkedin.com" }],
  },
];

const normalizeLabel = (label: string) => label.trim().toLowerCase();

const assetIconByLabel: Record<string, string | undefined> = {
  "sysarmy galicia": sysarmyIcon,
  "python coruña": pythonIcon,
  "coruña wtf": corunawtfIcon,
};

const svgIconByLabel: Record<string, React.ReactElement> = {
  linkedin: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      role="presentation"
    >
      <path d="M22 2V1H2v1H1v20h1v1h20v-1h1V2h-1Zm-9 10v8h-3v-11h3v1h1v-1h4v1h1v10h-3v-8h-3Zm-9-4V5h3v3H4Zm3 1v11H4V9h3Z" />
    </svg>
  ),
  default: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
    >
      <path d="m7 17 10-10" />
      <path d="M11 7h6v6" />
      <rect x="3" y="3" width="18" height="18" rx="0" />
    </svg>
  ),
};

const renderSocialIcon = (label: string) => {
  const normalized = normalizeLabel(label);
  const asset = assetIconByLabel[normalized];
  if (asset) {
    return (
      <span className="character-social-icon" aria-hidden="true">
        <img src={asset} alt="" loading="lazy" />
      </span>
    );
  }

  const svg = svgIconByLabel[normalized] ?? svgIconByLabel.default;
  return (
    <span className="character-social-icon" aria-hidden="true">
      {svg}
    </span>
  );
};

const TeamSection: React.FC = () => {
  const [activeMember, setActiveMember] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateView = (event?: MediaQueryListEvent) => {
      setIsMobileView(event ? event.matches : mediaQuery.matches);
    };

    updateView();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateView);
      return () => mediaQuery.removeEventListener("change", updateView);
    }

    mediaQuery.addListener(updateView);
    return () => mediaQuery.removeListener(updateView);
  }, []);

  useEffect(() => {
    if (!isMobileView || typeof window === "undefined") {
      observerRef.current?.disconnect();
      observerRef.current = null;
      setActiveMember((prev) => (prev !== null ? null : prev));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) {
          return;
        }

        const memberId = visible[0].target.getAttribute("data-member-id");
        if (memberId) {
          setActiveMember((prev) => (prev === memberId ? prev : memberId));
        }
      },
      { threshold: [0.45, 0.6, 0.75] },
    );

    observerRef.current = observer;

    Object.values(cardRefs.current).forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isMobileView]);

  const activateMember = useCallback((memberId: string) => {
    setActiveMember(memberId);
  }, []);

  const deactivateMember = useCallback((memberId: string) => {
    setActiveMember((prev) => (prev === memberId ? null : prev));
  }, []);

  const toggleMember = useCallback((memberId: string) => {
    setActiveMember((prev) => (prev === memberId ? null : memberId));
  }, []);

  return (
    <section id="team" className="panel team-section">
      <div className="team-parallax" aria-hidden="true">
        {/* <ParallaxLayer speed={-0.55} className="team-backdrop"> */}
        <img
          src={campBackdrop.src}
          alt="Campamento nocturno iluminado por una hoguera"
          className="team-parallax-img team-backdrop-img"
        />
        {/* </ParallaxLayer> */}
        <div className="team-gradient" />
        <div className="team-particles">
          <FireParticles count={85} />
        </div>
      </div>

      <div className="team-content">
        <div className="team-copy">
          <h2>El equipo</h2>
          <p>
            Somos un grupo de apasionados por la tecnología unidos por un
            objetivo común: crear espacios donde las comunidades locales puedan
            conectarse y compartir ideas. Así nació Lareiraconf, un proyecto que
            comenzó de una chispa en unas admincañas y que nos ha llevado hasta
            aquí.
          </p>
        </div>

        <div className="team-characters">
          {crewMembers.map((member) => {
            const isActive = activeMember === member.id;
            const linkedInSocial = member.socials.find(
              (social) => normalizeLabel(social.label) === "linkedin",
            );
            const otherSocials = member.socials.filter(
              (social) => normalizeLabel(social.label) !== "linkedin",
            );

            const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
              const nextTarget = event.relatedTarget as HTMLElement | null;
              if (!event.currentTarget.contains(nextTarget)) {
                if (!isMobileView) {
                  deactivateMember(member.id);
                }
              }
            };

            const cardClasses = ["character-card"];
            if (isActive) {
              cardClasses.push("card-active");
            }
            if (member.mirrored) {
              cardClasses.push("mirrored");
            }

            return (
              <article
                key={member.id}
                ref={(node) => {
                  const previousNode = cardRefs.current[member.id];
                  if (
                    observerRef.current &&
                    previousNode &&
                    previousNode !== node
                  ) {
                    observerRef.current.unobserve(previousNode);
                  }

                  cardRefs.current[member.id] = node;

                  if (node && observerRef.current) {
                    observerRef.current.observe(node);
                  }
                }}
                data-member-id={member.id}
                className={cardClasses.join(" ")}
                onMouseEnter={() => {
                  if (!isMobileView) {
                    activateMember(member.id);
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobileView) {
                    deactivateMember(member.id);
                  }
                }}
                onFocusCapture={() => activateMember(member.id)}
                onBlurCapture={handleBlur}
              >
                <button
                  type="button"
                  className="character-button"
                  onClick={() => {
                    if (!isMobileView) {
                      toggleMember(member.id);
                    }
                  }}
                  aria-label={member.name}
                  aria-expanded={isActive}
                  aria-controls={`member-tooltip-${member.id}`}
                  aria-describedby={
                    isActive ? `member-tooltip-${member.id}` : undefined
                  }
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
                    <span className="character-placeholder">
                      {member.initials}
                    </span>
                  )}
                  <span className="character-shadow" aria-hidden="true" />
                </button>

                <div
                  id={`member-tooltip-${member.id}`}
                  role="dialog"
                  className="character-tooltip"
                  aria-hidden={!isActive}
                >
                  <span
                    className="character-tooltip-frame"
                    aria-hidden="true"
                  />
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
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
