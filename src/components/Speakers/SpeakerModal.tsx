import React, { useEffect, useRef } from "react";
import type { Speaker } from "./speakers-types";
import { renderSocialIcon } from "../Team/social-icons";
import CornerFlourish from "../CornerFlourish/CornerFlourish";

interface SpeakerModalProps {
  speaker: Speaker | null;
  isOpen: boolean;
  onClose: () => void;
}

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
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

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
            <p className="speaker-modal__text">{speaker.summary}</p>
          </section>

          <section className="speaker-modal__section">
            <h4 className="speaker-modal__talk-title">{speaker.talkTitle}</h4>
            {speaker.talkDescription && (
              <p className="speaker-modal__text">{speaker.talkDescription}</p>
            )}
          </section>
        </div>
      </div>
    </dialog>
  );
};

export default SpeakerModal;
