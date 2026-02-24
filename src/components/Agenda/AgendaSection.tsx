import React, { useState } from "react";
import libraryBackdrop from "@img/parallax/library.png";
import "@styles/speakers.css";
import "./AgendaSection.scss";
import { getSpeakersData } from "../Speakers/speakers-data-i18n";
import type { Speaker } from "../Speakers/speakers-types";
import type { Locale } from "../../i18n/utils";
import SpeakerModal from "../Speakers/SpeakerModal";
import AgendaDay from "./AgendaDay";
import AgendaSlot from "./AgendaSlot";
import { useAgendaDay } from "./useAgendaDay";
import {
  agendaConfigs,
  SLOT_SPEAKER_IDS,
  UI_LABELS,
  getTrackSlots,
} from "./agenda-types";

interface Props {
  lang: "es" | "gl";
}

const AgendaSection: React.FC<Props> = ({ lang }) => {
  const config = agendaConfigs[lang] ?? agendaConfigs["es"];
  const t = UI_LABELS[lang] ?? UI_LABELS["es"];

  const friday = useAgendaDay(true);
  const saturday = useAgendaDay(true);
  const [modalSpeaker, setModalSpeaker] = useState<Speaker | null>(null);

  const speakers = getSpeakersData(lang as Locale);
  const speakerMap = new Map<string, Speaker>(
    speakers.map((s: Speaker) => [s.id, s]),
  );

  const previaSlots = getTrackSlots(config, ["previa"]);
  const eventoSlots = getTrackSlots(config, ["auditorium", "exterior"]);

  const renderSlot = (slot: ReturnType<typeof getTrackSlots>[number]) => {
    const speakerId = SLOT_SPEAKER_IDS[slot.id];
    const speaker = speakerId ? speakerMap.get(speakerId) : undefined;
    return (
      <AgendaSlot
        key={slot.id}
        slot={slot}
        speaker={speaker}
        lang={lang}
        onSpeakerClick={setModalSpeaker}
      />
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
          <AgendaDay
            date={t.friday}
            subtitle={t.fridaySubtitle}
            isOpen={friday.isOpen}
            isClosing={friday.isClosing}
            onToggle={friday.toggle}
          >
            {previaSlots.map(renderSlot)}
          </AgendaDay>

          <AgendaDay
            date={t.saturday}
            subtitle={t.saturdaySubtitle}
            isOpen={saturday.isOpen}
            isClosing={saturday.isClosing}
            onToggle={saturday.toggle}
          >
            {eventoSlots.map(renderSlot)}
          </AgendaDay>
        </div>

        <p className="agenda-disclaimer">{t.disclaimer}</p>
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
