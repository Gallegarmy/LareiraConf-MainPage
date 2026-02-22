import React from "react";
import "./CommunitiesSection.scss";
import { communities } from "./communities-data";
import FireParticles from "@components/Others/FireParticles";
import communitiesCamp from "@img/parallax/communities-camp.png";
import { useTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/utils";

interface CommunitiesSectionProps {
  lang?: Locale;
}

const CommunitiesSection: React.FC<CommunitiesSectionProps> = ({ lang = "es" }) => {
  const t = useTranslations(lang);
  return (
    <section className="panel communities-section" id="comunidades">
      <div className="communities-section__background">
        <div className="communities-section__bg-layer">
          <img
            src={communitiesCamp.src}
            alt="Campamento nocturno con hoguera"
            className="communities-section__backdrop-img"
          />
        </div>
        <div className="communities-section__particles">
          <FireParticles count={85} />
        </div>
      </div>

      <div className="communities-section__overlay"></div>

      <div className="communities-section__content">
        <h2 className="communities-section__title">{t("communities.title")}</h2>

        <div className="communities-section__intro">
          <p>{t("communities.description")}</p>
        </div>

        <div className="communities-section__grid">
          {communities.map((community) => (
            <a
              key={community.id}
              href={community.url}
              target="_blank"
              rel="noopener noreferrer"
              className="community-card"
              aria-label={`${t("communities.visitLabel")} ${community.name}`}
            >
              <img
                  src={community.logo}
                  alt={community.alt}
                  className="community-card__logo"
                  loading="lazy"
                />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitiesSection;
