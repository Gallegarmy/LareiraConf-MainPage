import React from "react";
import type { Speaker } from "../Speakers/speakers-types";
import {
  type Slot,
  type Locale,
  CATEGORY_LABELS,
  SPEAKER_SLOT_CATEGORIES,
  minutesToTime,
} from "./agenda-types";

interface AgendaSlotProps {
  slot: Slot;
  speaker?: Speaker;
  lang: Locale;
  onSpeakerClick: (speaker: Speaker) => void;
}

const SlotTag: React.FC<{ slot: Slot; lang: Locale }> = ({ slot, lang }) => {
  const label = CATEGORY_LABELS[lang]?.[slot.category];
  if (!label) return null;

  const showTopic =
    slot.category === "taller" ||
    slot.category === "talk" ||
    slot.category === "interview";
  const topic =
    slot.category === "taller" ? (slot.topic ?? slot.title) : slot.topic;

  return (
    <span className={`agenda-slot__tag agenda-slot__tag--${slot.category}`}>
      {label}
      {showTopic && topic && (
        <span className="agenda-slot__tag-topic"> · {topic}</span>
      )}
    </span>
  );
};

const SingleSpeakerContent: React.FC<{ speaker: Speaker }> = ({ speaker }) => (
  <>
    <div className="agenda-slot__avatar">
      <img src={speaker.image.src} alt={speaker.image.alt} loading="lazy" />
    </div>
    <div className="agenda-slot__main">
      <p className="agenda-slot__title">{speaker.talkTitle}</p>
      <div className="agenda-slot__speaker-info">
        <span className="agenda-slot__speaker-name">{speaker.name}</span>
        {(speaker.role || speaker.company) && (
          <span className="agenda-slot__company">
            {[speaker.role, speaker.company].filter(Boolean).join(" · ")}
          </span>
        )}
      </div>
    </div>
  </>
);

const MultiSpeakerContent: React.FC<{
  speaker: Speaker;
}> = ({ speaker }) => (
  <>
    <span className="agenda-slot__no-avatar" />
    <div className="agenda-slot__main">
      <p className="agenda-slot__title">{speaker.talkTitle}</p>
      <div className="agenda-slot__speakers-list">
        {speaker.speakers?.map((s, i) => (
          <div key={i} className="agenda-slot__speaker-row">
            <div className="agenda-slot__avatar agenda-slot__avatar--small">
              <img src={s.image.src} alt={s.image.alt} loading="lazy" />
            </div>
            <div className="agenda-slot__speaker-info">
              <span className="agenda-slot__speaker-name">{s.name}</span>
              {(s.role || s.company) && (
                <span className="agenda-slot__company">
                  {[s.role, s.company].filter(Boolean).join(" · ")}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

const NoSpeakerContent: React.FC<{ slot: Slot }> = ({ slot }) => {
  const hasMainContent = SPEAKER_SLOT_CATEGORIES.has(slot.category);

  if (hasMainContent) {
    return (
      <>
        <span className="agenda-slot__no-avatar" />
        <div className="agenda-slot__main">
          <p className="agenda-slot__title">{slot.title}</p>
        </div>
      </>
    );
  }

  return (
    <p className="agenda-slot__title agenda-slot__title--no-speaker">
      {slot.title}
    </p>
  );
};

const AgendaSlot: React.FC<AgendaSlotProps> = ({
  slot,
  speaker,
  lang,
  onSpeakerClick,
}) => {
  const isClickable = !!speaker;

  const classNames = [
    "agenda-slot",
    `agenda-slot--${slot.category}`,
    speaker?.isMultiSpeaker ? "agenda-slot--multi" : "",
    isClickable ? "agenda-slot--clickable" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      key={slot.id}
      className={classNames}
      onClick={isClickable ? () => onSpeakerClick(speaker!) : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => e.key === "Enter" && onSpeakerClick(speaker!)
          : undefined
      }
    >
      <span className="agenda-slot__time">{minutesToTime(slot.start)}</span>
      <SlotTag slot={slot} lang={lang} />

      {speaker ? (
        speaker.isMultiSpeaker && speaker.speakers ? (
          <MultiSpeakerContent speaker={speaker} />
        ) : (
          <SingleSpeakerContent speaker={speaker} />
        )
      ) : (
        <NoSpeakerContent slot={slot} />
      )}
    </li>
  );
};

export default AgendaSlot;
