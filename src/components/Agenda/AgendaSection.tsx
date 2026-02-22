import React, { useState } from "react";
import libraryBackdrop from "@img/parallax/library.png";
import papiroHorizontal from "@img/assets/pergamino_horizontal.png";
import papiroSinFondo from "@img/assets/pergamino.png";
import "@styles/speakers.css";
import "./AgendaSection.scss";
import agendaEs from "../../i18n/agenda-config.es.json";
import agendaGl from "../../i18n/agenda-config.gl.json";
import { getSpeakersData } from "../Speakers/speakers-data-i18n";
import type { Speaker } from "../Speakers/speakers-types";
import type { Locale } from "../../i18n/utils";
import SpeakerModal from "../Speakers/SpeakerModal";

type AgendaConfig = typeof agendaEs;

const agendaConfigs: Record<string, AgendaConfig> = {
  es: agendaEs,
  gl: agendaGl,
};

// Relación slot ID → speaker ID
const SLOT_SPEAKER_IDS: Record<string, string> = {
  "charla-1": "miguel-angel-duran",
  "entrevista-1": "almudena-barreiro",
  "entrevista-2": "nacho-marquez",
  "charla-2": "samuel-jimenez",
  "charla-3": "antonio-fernandes-pilar-vila",
  "entrevista-3": "nerea-luis",
  "charla-4": "diego-marino",
  borja: "borja-perez",
  cristina: "speaker-4",
  datola: "eva-gonzalez-brais-calvo",
};

const UI_LABELS = {
  es: {
    title: "Agenda",
    friday: "Viernes 20",
    fridaySubtitle: "La Previa",
    saturday: "Sábado 21",
    saturdaySubtitle: "LareiraConf",
  },
  gl: {
    title: "Axenda",
    friday: "Venres 20",
    fridaySubtitle: "A Previa",
    saturday: "Sábado 21",
    saturdaySubtitle: "LareiraConf",
  },
};

type Slot = {
  id: string;
  title: string;
  category: string;
  start: number;
  duration: number;
};

function getTrackSlots(config: AgendaConfig, trackIds: string[]): Slot[] {
  const slots = config.tracks
    .filter((t) => trackIds.includes(t.id))
    .flatMap((t) => t.slots as Slot[]);
  return [...slots].sort((a, b) => a.start - b.start);
}

function minutesToTime(minutes: number): string {
  const total = 540 + minutes; // base 9:00h
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

interface Props {
  lang: "es" | "gl";
}

const SPEAKER_SLOT_CATEGORIES = new Set([
  "talk",
  "interview",
  "taller",
  "show",
  "party",
]);

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  es: {
    talk: "Charla",
    interview: "Entrevista",
    taller: "Actividad",
  },
  gl: {
    talk: "Charla",
    interview: "Entrevista",
    taller: "Actividade",
  },
};

const AgendaSection: React.FC<Props> = ({ lang }) => {
  const config = agendaConfigs[lang] ?? agendaConfigs["es"];
  const t = UI_LABELS[lang] ?? UI_LABELS["es"];

  const [openFriday, setOpenFriday] = useState(true);
  const [openSaturday, setOpenSaturday] = useState(false);
  const [closingFriday, setClosingFriday] = useState(false);
  const [closingSaturday, setClosingSaturday] = useState(false);
  const [modalSpeaker, setModalSpeaker] = useState<Speaker | null>(null);

  const toggle = (day: "friday" | "saturday") => {
    const isOpen = day === "friday" ? openFriday : openSaturday;
    const setOpen = day === "friday" ? setOpenFriday : setOpenSaturday;
    const setClosing = day === "friday" ? setClosingFriday : setClosingSaturday;

    if (isOpen) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 550);
    } else {
      setOpen(true);
    }
  };

  const isDayOpen = (day: "friday" | "saturday") =>
    day === "friday" ? openFriday : openSaturday;

  const isDayClosing = (day: "friday" | "saturday") =>
    day === "friday" ? closingFriday : closingSaturday;

  const speakers = getSpeakersData(lang as Locale);
  const speakerMap = new Map<string, Speaker>(
    speakers.map((s: Speaker) => [s.id, s]),
  );

  const previaSlots = getTrackSlots(config, ["previa"]);
  const eventoSlots = getTrackSlots(config, ["auditorium", "exterior"]);

  const renderSlot = (slot: Slot) => {
    const speakerId = SLOT_SPEAKER_IDS[slot.id];
    const speaker = speakerId ? speakerMap.get(speakerId) : undefined;

    const hasMainContent = SPEAKER_SLOT_CATEGORIES.has(slot.category);

    const isClickable = !!speaker;

    return (
      <li
        key={slot.id}
        className={`agenda-slot agenda-slot--${slot.category}${speaker?.isMultiSpeaker ? " agenda-slot--multi" : ""}${isClickable ? " agenda-slot--clickable" : ""}`}
        onClick={isClickable ? () => setModalSpeaker(speaker) : undefined}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={isClickable ? (e) => e.key === "Enter" && setModalSpeaker(speaker) : undefined}
      >
        <span className="agenda-slot__time">{minutesToTime(slot.start)}</span>
        {CATEGORY_LABELS[lang]?.[slot.category] && (
          <span className={`agenda-slot__tag agenda-slot__tag--${slot.category}`}>
            {CATEGORY_LABELS[lang][slot.category]}
          </span>
        )}

        {speaker ? (
          speaker.isMultiSpeaker && speaker.speakers ? (
            // Multi-ponente: título + lista de ponentes individuales
            <>
              <span className="agenda-slot__no-avatar" />
              <div className="agenda-slot__main">
                <p className="agenda-slot__title">{speaker.talkTitle}</p>
                <div className="agenda-slot__speakers-list">
                  {speaker.speakers.map((s, i) => (
                    <div key={i} className="agenda-slot__speaker-row">
                      <div className="agenda-slot__avatar agenda-slot__avatar--small">
                        <img src={s.image.src} alt={s.image.alt} loading="lazy" />
                      </div>
                      <div className="agenda-slot__speaker-info">
                        <span className="agenda-slot__speaker-name">{s.name}</span>
                        {s.company && (
                          <span className="agenda-slot__company">{s.company}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Ponente único
            <>
              <div className="agenda-slot__avatar">
                <img
                  src={speaker.image.src}
                  alt={speaker.image.alt}
                  loading="lazy"
                />
              </div>
              <div className="agenda-slot__main">
                <p className="agenda-slot__title">{speaker.talkTitle}</p>
                <div className="agenda-slot__speaker-info">
                  <span className="agenda-slot__speaker-name">{speaker.name}</span>
                  {speaker.company && (
                    <span className="agenda-slot__company">{speaker.company}</span>
                  )}
                </div>
              </div>
            </>
          )
        ) : hasMainContent ? (
          <>
            <span className="agenda-slot__no-avatar" />
            <div className="agenda-slot__main">
              <p className="agenda-slot__title">{slot.title}</p>
            </div>
          </>
        ) : (
          <p className="agenda-slot__title agenda-slot__title--no-speaker">
            {slot.title}
          </p>
        )}
      </li>
    );
  };

  return (
    <section id="agenda" className="panel agenda-section speakers-section">
      <div className="speakers-parallax" aria-hidden="true">
        <img
          src={libraryBackdrop.src}
          alt=""
          className="speakers-parallax__background"
          loading="lazy"
        />
        <div className="speakers-parallax__gradient" />
      </div>

      <div className="agenda-content speakers-content">
        <div className="agenda-scroll">

          {/* ── Viernes ── */}
          <div className={[
            "agenda-scroll-day",
            isDayOpen("friday") ? "agenda-scroll-day--open" : "",
            isDayClosing("friday") ? "agenda-scroll-day--closing" : "",
          ].filter(Boolean).join(" ")}>
            <button
              className="agenda-day__header"
              onClick={() => toggle("friday")}
              aria-expanded={isDayOpen("friday")}
            >
              <img
                src={papiroHorizontal.src}
                alt=""
                className="agenda-day__header-img"
                aria-hidden="true"
              />
              <div className="agenda-day__header-content">
                <span className="agenda-day__date">{t.friday}</span>
                <span className="agenda-day__subtitle">{t.fridaySubtitle}</span>
              </div>
            </button>
            <div className="agenda-day__body" style={{ backgroundImage: `url(${papiroSinFondo.src})` }}>
              <div className="agenda-papyrus">
                <ul className="agenda-slots">{previaSlots.map(renderSlot)}</ul>
              </div>
            </div>
            <div className="agenda-day__footer" aria-hidden="true">
              <img src={papiroHorizontal.src} alt="" className="agenda-day__footer-img" />
            </div>
          </div>

          {/* ── Sábado ── */}
          <div className={[
            "agenda-scroll-day",
            isDayOpen("saturday") ? "agenda-scroll-day--open" : "",
            isDayClosing("saturday") ? "agenda-scroll-day--closing" : "",
          ].filter(Boolean).join(" ")}>
            <button
              className="agenda-day__header"
              onClick={() => toggle("saturday")}
              aria-expanded={isDayOpen("saturday")}
            >
              <img
                src={papiroHorizontal.src}
                alt=""
                className="agenda-day__header-img"
                aria-hidden="true"
              />
              <div className="agenda-day__header-content">
                <span className="agenda-day__date">{t.saturday}</span>
                <span className="agenda-day__subtitle">{t.saturdaySubtitle}</span>
              </div>
            </button>
            <div className="agenda-day__body" style={{ backgroundImage: `url(${papiroSinFondo.src})` }}>
              <div className="agenda-papyrus">
                <ul className="agenda-slots">{eventoSlots.map(renderSlot)}</ul>
              </div>
            </div>
            <div className="agenda-day__footer" aria-hidden="true">
              <img src={papiroHorizontal.src} alt="" className="agenda-day__footer-img" />
            </div>
          </div>

        </div>
      </div>
      <SpeakerModal
        speaker={modalSpeaker}
        isOpen={!!modalSpeaker}
        onClose={() => setModalSpeaker(null)}
      />
    </section>
  );
};

export default AgendaSection;
