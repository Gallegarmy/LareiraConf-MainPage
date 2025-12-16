import styles from "./schedule-planner.module.css";
import type { ScheduleSlot, SlotCategory, TrackId } from "./slot-utils";

export const DAY_START_MINUTES = 9 * 60;
export const DAY_END_MINUTES = 24 * 60;
export const TOTAL_MINUTES = DAY_END_MINUTES - DAY_START_MINUTES;
export const PIXELS_PER_MINUTE = 3;

export const TRACKS: TrackId[] = ["auditorium", "exterior"];

export const TRACK_LABELS: Record<TrackId, string> = {
  auditorium: "Auditorio",
  exterior: "Exterior",
};

export const CATEGORY_METADATA: Record<
  SlotCategory,
  { label: string; className: string; gradient: string }
> = {
  talk: {
    label: "Charla",
    className: styles.slotTalk,
    gradient: "var(--slot-color-talk)",
  },
  announcement: {
    label: "Anuncio / Orga",
    className: styles.slotAnnouncement,
    gradient: "var(--slot-color-announcement)",
  },
  social: {
    label: "Ocio",
    className: styles.slotSocial,
    gradient: "var(--slot-color-social)",
  },
  registration: {
    label: "Registro",
    className: styles.slotRegistration,
    gradient: "var(--slot-color-registration)",
  },
  interview: {
    label: "Entrevista",
    className: styles.slotInterview,
    gradient: "var(--slot-color-interview)",
  },
  show: {
    label: "Show",
    className: styles.slotShow,
    gradient: "var(--slot-color-show)",
  },
  break: {
    label: "Descanso",
    className: styles.slotBreak,
    gradient: "var(--slot-color-break)",
  },
  party: {
    label: "Fiesta",
    className: styles.slotParty,
    gradient: "var(--slot-color-party)",
  },
};

export type BaseScheduleSlot = ScheduleSlot & { track: TrackId };

export const BASE_SCHEDULE: BaseScheduleSlot[] = [
  {
    id: "registro",
    title: "Registro",
    category: "registration",
    track: "exterior",
    start: 0,
    duration: 60,
  },
  {
    id: "bienvenida",
    title: "Bienvenida",
    category: "announcement",
    track: "auditorium",
    start: 60,
    duration: 30,
  },
  {
    id: "charla-1",
    title: "Charla 1",
    category: "talk",
    track: "auditorium",
    start: 90,
    duration: 30,
  },
  {
    id: "entrevista-1",
    title: "Entrevista 1",
    category: "interview",
    track: "auditorium",
    start: 120,
    duration: 30,
  },
  {
    id: "coffee-break",
    title: "Coffee break",
    category: "break",
    track: "exterior",
    start: 150,
    duration: 45,
  },
  {
    id: "entrevista-2",
    title: "Entrevista 2",
    category: "interview",
    track: "auditorium",
    start: 195,
    duration: 30,
  },
  {
    id: "charla-2",
    title: "Charla 2",
    category: "talk",
    track: "auditorium",
    start: 225,
    duration: 30,
  },
  {
    id: "entrevista-3",
    title: "Entrevista 3",
    category: "interview",
    track: "auditorium",
    start: 255,
    duration: 30,
  },
  {
    id: "comida",
    title: "Comida",
    category: "break",
    track: "exterior",
    start: 285,
    duration: 105,
  },
  {
    id: "actuacion",
    title: "Actuación sorpresa",
    category: "show",
    track: "auditorium",
    start: 390,
    duration: 45,
  },
  {
    id: "charla-3",
    title: "Charla 3",
    category: "talk",
    track: "auditorium",
    start: 435,
    duration: 30,
  },
  {
    id: "entrevista-4",
    title: "Entrevista 4",
    category: "interview",
    track: "auditorium",
    start: 465,
    duration: 30,
  },
  {
    id: "break-tarde",
    title: "Break",
    category: "break",
    track: "exterior",
    start: 495,
    duration: 45,
  },
  {
    id: "charla-4",
    title: "Charla 4",
    category: "talk",
    track: "auditorium",
    start: 540,
    duration: 30,
  },
  {
    id: "cierre",
    title: "Cierre del día",
    category: "announcement",
    track: "auditorium",
    start: 570,
    duration: 45,
  },
  {
    id: "fiesta",
    title: "Fiesta Lareira",
    category: "party",
    track: "exterior",
    start: 615,
    duration: 105,
  },
  {
    id: "cena",
    title: "Cena",
    category: "break",
    track: "exterior",
    start: 720,
    duration: 180,
  },
];

export const LEGEND_CATEGORIES = Array.from(
  new Set(BASE_SCHEDULE.map((slot) => slot.category)),
) as SlotCategory[];

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_METADATA).map(
  ([value, metadata]) => ({
    value: value as SlotCategory,
    label: metadata.label,
  }),
);
