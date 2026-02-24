import agendaEs from "../../i18n/agenda-config.es.json";
import agendaGl from "../../i18n/agenda-config.gl.json";

export type AgendaConfig = typeof agendaEs;

export type Slot = {
  id: string;
  title: string;
  topic?: string;
  category: string;
  start: number;
  duration: number;
};

export type Locale = "es" | "gl";

export const agendaConfigs: Record<string, AgendaConfig> = {
  es: agendaEs,
  gl: agendaGl,
};

// Relación slot ID → speaker ID
export const SLOT_SPEAKER_IDS: Record<string, string> = {
  "charla-1": "miguel-angel-duran",
  "entrevista-1": "almudena-barreiro",
  "entrevista-2": "nacho-marquez",
  "charla-2": "samuel-jimenez",
  "entrevista-4": "antonio-fernandes-pilar-vila",
  "charla-4": "diego-marino",
  "entrevista-3": "nerea-luis",
  borja: "borja-perez",
  cristina: "speaker-4",
  datola: "eva-gonzalez-brais-calvo",
};

export const UI_LABELS: Record<
  Locale,
  {
    title: string;
    friday: string;
    fridaySubtitle: string;
    saturday: string;
    saturdaySubtitle: string;
    disclaimer: string;
  }
> = {
  es: {
    title: "Agenda",
    friday: "Viernes 20",
    fridaySubtitle: "La Previa",
    saturday: "Sábado 21",
    saturdaySubtitle: "LareiraConf",
    disclaimer: "Los horarios son orientativos y pueden variar.",
  },
  gl: {
    title: "Axenda",
    friday: "Venres 20",
    fridaySubtitle: "A Previa",
    saturday: "Sábado 21",
    saturdaySubtitle: "LareiraConf",
    disclaimer: "Os horarios son orientativos e poden variar.",
  },
};

export const SPEAKER_SLOT_CATEGORIES = new Set([
  "talk",
  "interview",
  "taller",
  "show",
  "party",
]);

export const CATEGORY_LABELS: Record<Locale, Record<string, string>> = {
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

export function getTrackSlots(
  config: AgendaConfig,
  trackIds: string[],
): Slot[] {
  const slots = config.tracks
    .filter((t) => trackIds.includes(t.id))
    .flatMap((t) => t.slots as Slot[]);
  return [...slots].sort((a, b) => a.start - b.start);
}

export function minutesToTime(minutes: number): string {
  const total = 540 + minutes; // base 9:00h
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}
