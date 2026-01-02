import React, { useEffect, useRef } from "react";
import type { Speaker } from "./speakers-types";

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
            <img
              src={speaker.image.src}
              alt={speaker.image.alt}
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
                    {social.label === "LinkedIn" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    )}
                    {social.label === "X" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                      </svg>
                    )}
                    {social.label === "YouTube" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="speaker-modal__body">
          <section className="speaker-modal__section">
            <h3 className="speaker-modal__section-title">Biografía</h3>
            <p className="speaker-modal__text">{speaker.summary}</p>
          </section>

          <section className="speaker-modal__section">
            <h3 className="speaker-modal__section-title">Charla</h3>
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
