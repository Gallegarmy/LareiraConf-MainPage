import React, { useEffect, useRef } from "react";
import type { Speaker } from "./speakers-types";
import { renderSocialIcon } from "../Team/social-icons";
import CornerFlourish from "../CornerFlourish/CornerFlourish";

interface SpeakerModalProps {
  speaker: Speaker | null;
  isOpen: boolean;
  onClose: () => void;
}

// Helper para renderizar texto con párrafos
const renderTextWithParagraphs = (text: string, className: string) => {
  const paragraphs = text.split("\n").filter((p) => p.trim());
  return paragraphs.map((paragraph, index) => (
    <p key={index} className={className}>
      {paragraph}
    </p>
  ));
};

const SpeakerModal: React.FC<SpeakerModalProps> = ({
  speaker,
  isOpen,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && speaker) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, speaker]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!isInDialog) {
      onClose();
    }
  };

  if (!speaker) return null;

  const isMultiSpeaker = speaker.isMultiSpeaker && speaker.speakers;

  return (
    <dialog
      ref={dialogRef}
      className="speaker-modal"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="speaker-modal__content">
        <button
          className="speaker-modal__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z"
              fill="currentColor"
            />
          </svg>
        </button>

        {isMultiSpeaker && speaker.speakers ? (
          <>
            {/* Múltiples ponentes */}
            <div className="speaker-modal__multi-speakers">
              {speaker.speakers.map((subSpeaker, index) => (
                <div key={index} className="speaker-modal__header">
                  <div className="speaker-modal__image-container">
                    <CornerFlourish position="top-left" />
                    <CornerFlourish position="top-right" />
                    <CornerFlourish position="bottom-left" />
                    <CornerFlourish position="bottom-right" />
                    <img
                      src={subSpeaker.imageReal?.src || subSpeaker.image.src}
                      alt={subSpeaker.imageReal?.alt || subSpeaker.image.alt}
                      className="speaker-modal__image"
                    />
                  </div>
                  <div className="speaker-modal__title">
                    <h2 className="speaker-modal__name">{subSpeaker.name}</h2>
                    <p className="speaker-modal__role">{subSpeaker.role}</p>
                    {subSpeaker.company && (
                      <p className="speaker-modal__company">
                        {subSpeaker.company}
                      </p>
                    )}
                    {subSpeaker.socials && subSpeaker.socials.length > 0 && (
                      <div className="speaker-modal__socials">
                        {subSpeaker.socials.map((social, socialIndex) => (
                          <a
                            key={socialIndex}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="speaker-modal__social-icon"
                            aria-label={social.label}
                            title={social.label}
                          >
                            {renderSocialIcon(social.label)}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="speaker-modal__body">
              {speaker.speakers.map((subSpeaker, index) => (
                <section key={index} className="speaker-modal__section">
                  <h3 className="speaker-modal__bio-title">
                    Bio - {subSpeaker.name}
                  </h3>
                  {renderTextWithParagraphs(
                    subSpeaker.summary,
                    "speaker-modal__text",
                  )}
                </section>
              ))}

              <section className="speaker-modal__section">
                <h4 className="speaker-modal__talk-title">
                  {speaker.talkTitle}
                </h4>
                {speaker.talkDescription && (
                  <>
                    {renderTextWithParagraphs(
                      speaker.talkDescription,
                      "speaker-modal__text",
                    )}
                  </>
                )}
              </section>
            </div>
          </>
        ) : (
          <>
            {/* Un solo ponente */}
            <div className="speaker-modal__header">
              <div className="speaker-modal__image-container">
                <CornerFlourish position="top-left" />
                <CornerFlourish position="top-right" />
                <CornerFlourish position="bottom-left" />
                <CornerFlourish position="bottom-right" />
                <img
                  src={speaker.imageReal?.src || speaker.image.src}
                  alt={speaker.imageReal?.alt || speaker.image.alt}
                  className="speaker-modal__image"
                />
              </div>
              <div className="speaker-modal__title">
                <h2 className="speaker-modal__name">{speaker.name}</h2>
                <p className="speaker-modal__role">{speaker.role}</p>
                {speaker.company && (
                  <p className="speaker-modal__company">{speaker.company}</p>
                )}
                {speaker.socials && speaker.socials.length > 0 && (
                  <div className="speaker-modal__socials">
                    {speaker.socials.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="speaker-modal__social-icon"
                        aria-label={social.label}
                        title={social.label}
                      >
                        {renderSocialIcon(social.label)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="speaker-modal__body">
              <section className="speaker-modal__section">
                {renderTextWithParagraphs(
                  speaker.summary,
                  "speaker-modal__text",
                )}
              </section>

              <section className="speaker-modal__section">
                <h4 className="speaker-modal__talk-title">
                  {speaker.talkTitle}
                </h4>
                {speaker.talkDescription && (
                  <>
                    {renderTextWithParagraphs(
                      speaker.talkDescription,
                      "speaker-modal__text",
                    )}
                  </>
                )}
              </section>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default SpeakerModal;
