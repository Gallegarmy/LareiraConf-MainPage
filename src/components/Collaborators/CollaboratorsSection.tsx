import React from "react";
import "@styles/sponsors.css";
import sponsorsBg from "@img/parallax/sponsors-bg.avif";
import FireflyParticles from "@components/Others/FireflyParticles";
import { useTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/utils";
import CollaboratorsBunting from "./CollaboratorsBunting";

interface CollaboratorsSectionProps {
  lang?: Locale;
}

const CollaboratorsSection: React.FC<CollaboratorsSectionProps> = ({
  lang = "es",
}) => {
  const t = useTranslations(lang);

  return (
    <section className="panel sponsors-section" id="colaboradores">
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

      <div className="collab-content">
        <div className="collab-content__header">
          <h2 className="collab-content__title">
            {t("collaborators.title")}
          </h2>
          <p className="collab-content__description">
            {t("collaborators.description")}
          </p>
        </div>
        <CollaboratorsBunting />
      </div>
    </section>
  );
};

export default CollaboratorsSection;