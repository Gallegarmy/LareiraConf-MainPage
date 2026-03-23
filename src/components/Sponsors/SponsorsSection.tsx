import React from "react";
import FireflyParticles from "@components/Others/FireflyParticles";
import sponsorsBg from "@img/parallax/sponsors-bg.avif";
import { useTranslations, type Locale } from "@/i18n/utils";
import "@styles/sponsors.css";
import SponsorCard from "./SponsorCard";
import { sponsorsByTier } from "./sponsorsData";
import CollaboratorsBunting from "@components/Collaborators/CollaboratorsBunting";

const SponsorsSection: React.FC<{ lang: string }> = ({ lang }) => {
  const t = useTranslations(lang as Locale);

  return (
    <section
      id="colaboradores"
      className="panel sponsors-section"
      data-section="sponsors"
      data-nav-ids="colaboradores patrocinadores"
    >
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

      <div className="sponsors-scroll-track">
        {/* ── Página 1: Colaboradores ── */}
        <div className="sponsors-page sponsors-page--collab">
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
        </div>

        {/* ── Página 2: Patrocinadores ── */}
        <div id="patrocinadores" className="sponsors-page">
          <div className="sponsors-content">
            <div className="sponsors-section__sign">
              <h2 className="sponsors-section__sign-text">
                {t("sponsors.title")}
              </h2>
              <div className="sponsors-section__description">
                <p>{t("sponsors.description")}</p>
              </div>
            </div>

            <div className="sponsors-grid">
              <div className="sponsors-grid__maestros">
                <div className="sponsors-grid__maestros-row sponsors-grid__maestros-row--1">
                  {sponsorsByTier.maestrosArtesanos
                    .slice(0, 5)
                    .map((sponsor, idx) => (
                      <SponsorCard key={idx} sponsor={sponsor} index={idx} />
                    ))}
                </div>
                <div className="sponsors-grid__maestros-row sponsors-grid__maestros-row--2">
                  {sponsorsByTier.maestrosArtesanos
                    .slice(5)
                    .map((sponsor, idx) => (
                      <SponsorCard
                        key={idx + 5}
                        sponsor={sponsor}
                        index={idx + 5}
                      />
                    ))}
                </div>
              </div>

              <div className="sponsors-grid__foreground">
                <div className="sponsors-grid__oficial-left">
                  {sponsorsByTier.oficialesArtesanos
                    .slice(0, 2)
                    .map((sponsor, idx) => (
                      <SponsorCard key={idx} sponsor={sponsor} index={idx} />
                    ))}
                </div>

                <div className="sponsors-grid__gran-maestro">
                  <SponsorCard sponsor={sponsorsByTier.granMaestro} index={0} />
                </div>

                <div className="sponsors-grid__oficial-right">
                  {sponsorsByTier.oficialesArtesanos
                    .slice(2)
                    .map((sponsor, idx) => (
                      <SponsorCard
                        key={idx + 2}
                        sponsor={sponsor}
                        index={idx + 2}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;