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

const AgendaSection: React.FC<Props> = ({ lang }) => {
  const config = agendaConfigs[lang] ?? agendaConfigs["es"];
  const t = UI_LABELS[lang] ?? UI_LABELS["es"];

  const [openDay, setOpenDay] = useState<"friday" | "saturday" | null>(null);
  const [closingDay, setClosingDay] = useState<"friday" | "saturday" | null>(null);

  const toggle = (day: "friday" | "saturday") => {
    if (openDay === day) {
      // Iniciar animación de cierre y luego colapsar
      setClosingDay(day);
      setTimeout(() => {
        setOpenDay(null);
        setClosingDay(null);
      }, 650);
    } else {
      setClosingDay(null);
      setOpenDay(day);
    }
  };

  const speakers = getSpeakersData(lang as Locale);
  const speakerMap = new Map<string, Speaker>(
    speakers.map((s: Speaker) => [s.id, s]),
  );

  const previaSlots = getTrackSlots(config, ["previa"]);
  const eventoSlots = getTrackSlots(config, ["auditorium", "exterior"]);

  const renderSlot = (slot: Slot) => {
    const speakerId = SLOT_SPEAKER_IDS[slot.id];
    const speaker = speakerId ? speakerMap.get(speakerId) : undefined;

    const displayName = speaker?.isMultiSpeaker
      ? (speaker.speakers?.map((s: { name: string }) => s.name).join(" & ") ??
        speaker.name)
      : speaker?.name;

    const company =
      speaker?.company ??
      (speaker?.isMultiSpeaker ? speaker.speakers?.[0]?.company : undefined);

    const hasMainContent = SPEAKER_SLOT_CATEGORIES.has(slot.category);

    return (
      <li key={slot.id} className={`agenda-slot agenda-slot--${slot.category}`}>
        <span className="agenda-slot__time">{minutesToTime(slot.start)}</span>

        {speaker ? (
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
                <span className="agenda-slot__speaker-name">{displayName}</span>
                {company && (
                  <span className="agenda-slot__company">{company}</span>
                )}
              </div>
            </div>
          </>
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
        <h2 className="speakers-title">{t.title}</h2>
        <div className="agenda-scroll">

          {/* ── Viernes ── */}
          <div className={[
            "agenda-scroll-day",
            openDay === "friday" ? "agenda-scroll-day--open" : "",
            closingDay === "friday" ? "agenda-scroll-day--closing" : "",
          ].filter(Boolean).join(" ")}>
            <button
              className="agenda-day__header"
              onClick={() => toggle("friday")}
              aria-expanded={openDay === "friday"}
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
            <div className="agenda-day__body">
              <div className="agenda-papyrus">
                <img
                  src={papiroSinFondo.src}
                  alt=""
                  className="agenda-papyrus__img"
                  aria-hidden="true"
                />
                <ul className="agenda-slots">{previaSlots.map(renderSlot)}</ul>
              </div>
            </div>
          </div>

          {/* ── Sábado ── */}
          <div className={[
            "agenda-scroll-day",
            openDay === "saturday" ? "agenda-scroll-day--open" : "",
            closingDay === "saturday" ? "agenda-scroll-day--closing" : "",
          ].filter(Boolean).join(" ")}>
            <button
              className="agenda-day__header"
              onClick={() => toggle("saturday")}
              aria-expanded={openDay === "saturday"}
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
            <div className="agenda-day__body">
              <div className="agenda-papyrus">
                <img
                  src={papiroSinFondo.src}
                  alt=""
                  className="agenda-papyrus__img"
                  aria-hidden="true"
                />
                <ul className="agenda-slots">{eventoSlots.map(renderSlot)}</ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
