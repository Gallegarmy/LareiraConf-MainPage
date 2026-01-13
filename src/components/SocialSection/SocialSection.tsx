import React from "react";
import CornerFlourish from "@components/CornerFlourish/CornerFlourish";
import ParallaxLayer from "@components/Parallax/ParallaxLayer";
import FireParticles from "@components/Others/FireParticles";
import Footer from "@components/Footer/Footer";
import { useTranslations, type Locale } from "@/i18n/utils";

import socialBackground from "@img/parallax/social-background.png";

import "./SocialSection.scss";

const LAST_YEAR_URL = "/2025";
const VIDEO_SUMMARY_URL = "https://www.youtube.com/watch?v=5DSKwFrNICA";

type SocialLink = {
  name: string;
  href: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      ry="5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.2" cy="6.8" r="1.4" fill="currentColor" />
  </svg>
);

const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="3"
      ry="3"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <rect x="6.8" y="10" width="2.6" height="8" fill="currentColor" />
    <rect x="6.8" y="6.6" width="2.6" height="2.6" fill="currentColor" />
    <path
      d="M12 10H14.6C16.4 10 17.6 11.3 17.6 13.4V18H15V13.9C15 12.9 14.6 12.3 13.8 12.3C13 12.3 12.5 12.9 12.5 13.9V18H10V10H12Z"
      fill="currentColor"
    />
  </svg>
);

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="3"
      ry="3"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M8 8L16 16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 8L8 16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/lareiraconf",
    Icon: InstagramIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/lareiraconf",
    Icon: LinkedInIcon,
  },
  {
    name: "X",
    href: "https://x.com/lareiraconf",
    Icon: XIcon,
  },
];

interface SocialSectionProps {
  lang: Locale;
}

const SocialSection: React.FC<SocialSectionProps> = ({ lang }) => {
  const t = useTranslations(lang);

  return (
    <section className="panel social-section" id="community">
      <div className="social-section__background" aria-hidden="true">
        <ParallaxLayer
          speed={0}
          className="social-section__bg-layer"
          isCentered
        >
          <img
            src={socialBackground.src}
            alt=""
            className="social-section__bg-image"
          />
        </ParallaxLayer>
        <ParallaxLayer
          speed={-0.35}
          className="social-section__particles"
          isCentered
        >
          <FireParticles count={60} />
        </ParallaxLayer>
        <div className="social-section__overlay" />
      </div>
      <div className="social-section__frame">
        <CornerFlourish position="top-left" />
        <CornerFlourish position="top-right" />
        <CornerFlourish position="bottom-left" />
        <CornerFlourish position="bottom-right" />

        <div className="social-section__content">
          <header className="social-section__header">
            <h2 className="social-section__title">{t("social.title")}</h2>
            <p className="social-section__description">
              {(() => {
                const text = t("social.description.text");
                const parts = text.split(/(\{lastYear\}|\{videoSummary\})/);

                return parts.map((part, index) => {
                  if (part === "{lastYear}") {
                    return (
                      <a key={index} href={LAST_YEAR_URL}>
                        {t("social.description.lastYear")}
                      </a>
                    );
                  }
                  if (part === "{videoSummary}") {
                    return (
                      <a
                        key={index}
                        href={VIDEO_SUMMARY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("social.description.videoSummary")}
                      </a>
                    );
                  }
                  return part;
                });
              })()}
            </p>
          </header>

          <ul className="social-section__links">
            {SOCIAL_LINKS.map(({ name, href, Icon }) => (
              <li key={name} className="social-section__card">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-section__link"
                  aria-label={name}
                >
                  <Icon className="social-section__link-icon" />
                  <span className="social-section__sr-only">{name}</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="social-section__continuara">{t("social.continuara")}</p>
        </div>
      </div>
      <Footer lang={lang} />
    </section>
  );
};

export default SocialSection;
