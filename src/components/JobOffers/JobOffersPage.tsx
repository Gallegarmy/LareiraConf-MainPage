import { useState } from "react";
import { jobOffers, sponsorBenefits, type JobOffer } from "./job-offers-data";
import FireParticles from "@components/Others/FireParticles";
import "./JobOffersPage.scss";

function JobCard({ offer }: { offer: JobOffer }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`job-card${expanded ? " job-card--expanded" : ""}`}>
      <span className="job-card__pin job-card__pin--bl" aria-hidden="true" />
      <span className="job-card__pin job-card__pin--br" aria-hidden="true" />
      <button
        className="job-card__toggle"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div className="job-card__header">
          <div className="job-card__header-left">
            <img
              src={offer.logo}
              alt={`Logo de ${offer.company}`}
              className="job-card__logo"
            />
            <h2 className="job-card__title">{offer.title}</h2>
          </div>
          <div className="job-card__header-right">
            <span
              className={`job-card__modality-badge job-card__modality-badge--${offer.modality}`}
            >
              {offer.modality}
            </span>
            <p className="job-card__location">{offer.location}</p>
            <svg
              className="job-card__chevron"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <path d="M13 16H11V14H13V16ZM11 14H9V12H11V14ZM15 14H13V12H15V14ZM9 12H7V10H9V12ZM17 12H15V10H17V12ZM7 10H5V8H7V10ZM19 10H17V8H19V10Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </button>

      <div className="job-card__body">
        <p className="job-card__description">{offer.description}</p>

        <ul className="job-card__requirements">
          {offer.requirements.map((req, i) => (
            <li key={i} className="job-card__requirement">
              {req}
            </li>
          ))}
        </ul>

        <div className="job-card__benefits">
          <h3 className="job-card__benefits-title">¿Qué te ofrecemos?</h3>
          <ul className="job-card__benefits-list">
            {sponsorBenefits.map((benefit, i) => (
              <li key={i} className="job-card__benefit">
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={offer.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="job-card__apply"
        >
          {offer.applyLabel} →
        </a>
      </div>
    </article>
  );
}

export default function JobOffersPage() {
  return (
    <div className="job-offers-page">
      <FireParticles count={40} />
      <div className="job-offers-page__header">
        <h1 className="job-offers-page__title">Ofertas de empleo</h1>
      </div>

      <div className="job-offers-page__grid">
        {jobOffers.map((offer) => (
          <JobCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
}
