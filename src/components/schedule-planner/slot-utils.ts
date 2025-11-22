export type TrackId = "auditorium" | "exterior";
export type SlotCategory =
  | "talk"
  | "announcement"
  | "social"
  | "registration"
  | "interview"
  | "show"
  | "break"
  | "party"

export interface ScheduleSlot {
  id: string;
  title: string;
  category: SlotCategory;
  start: number; // minutes since the day start
  duration: number; // minutes
}

export const STEP_MINUTES = 5;
export const MIN_SLOT_DURATION = 5;

export const snapToStep = (
  value: number,
  step: number = STEP_MINUTES,
): number => {
  return Math.round(value / step) * step;
};

export const clamp = (value: number, min: number, max: number): number => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

export const normalizeSlots = (
  slots: ScheduleSlot[],
  totalMinutes: number,
  minDuration: number = MIN_SLOT_DURATION,
): ScheduleSlot[] => {
  const sorted = [...slots].sort((first, second) => first.start - second.start);
  let previousEnd = 0;

  return sorted.map((slot) => {
    const slotMinDuration = slot.duration <= 0 ? 0 : minDuration;
    const maxStart = Math.max(0, totalMinutes - slotMinDuration);
    let start = clamp(slot.start, 0, maxStart);
    if (start < previousEnd) {
      start = previousEnd;
    }

    let duration = clamp(
      slot.duration,
      slotMinDuration,
      Math.max(slotMinDuration, totalMinutes - start),
    );

    if (start + duration > totalMinutes) {
      if (slotMinDuration === 0) {
        duration = Math.max(0, totalMinutes - start);
      } else {
        const adjustedDuration = Math.max(
          slotMinDuration,
          totalMinutes - start,
        );
        duration = adjustedDuration;
        if (start + duration > totalMinutes) {
          const fallbackDuration = Math.max(slotMinDuration, minDuration);
          start = Math.max(0, totalMinutes - fallbackDuration);
          duration = fallbackDuration;
        }
      }
    }

    const blockingDuration = Math.max(duration, minDuration);
    previousEnd = start + blockingDuration;
    return { ...slot, start, duration };
  });
};

export const formatTime = (dayStart: number, offset: number): string => {
  const absoluteMinutes = dayStart + offset;
  const hours = Math.floor(absoluteMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (absoluteMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0) {
    return remainingMinutes > 0
      ? `${hours} h ${remainingMinutes} min`
      : `${hours} h`;
  }
  return `${minutes} min`;
};

export const updateSlotCollection = (
  slots: ScheduleSlot[],
  slotId: string,
  totalMinutes: number,
  minDuration: number,
  changes: Partial<
    Pick<ScheduleSlot, "start" | "duration" | "title" | "category">
  >,
): ScheduleSlot[] => {
  const updated = slots.map((slot) =>
    slot.id === slotId ? { ...slot, ...changes } : slot,
  );

  return normalizeSlots(updated, totalMinutes, minDuration);
};

export const insertSlot = (
  slots: ScheduleSlot[],
  slot: ScheduleSlot,
  totalMinutes: number,
  minDuration: number,
): ScheduleSlot[] => {
  return normalizeSlots([...slots, slot], totalMinutes, minDuration);
};

export const removeSlot = (
  slots: ScheduleSlot[],
  slotId: string,
): ScheduleSlot[] => {
  return slots.filter((slot) => slot.id !== slotId);
};

export interface ScheduleExportTrack {
  id: TrackId;
  label?: string;
  slots: ScheduleSlot[];
}

export interface ScheduleExportPayload {
  generatedAt: string;
  dayStartMinutes: number;
  dayEndMinutes: number;
  stepMinutes: number;
  tracks: ScheduleExportTrack[];
}

interface ScheduleExportOptions {
  dayStart: number;
  dayEnd: number;
  stepMinutes: number;
  trackLabels?: Partial<Record<TrackId, string>>;
  trackOrder?: TrackId[];
}

export const createScheduleExport = (
  tracks: Record<TrackId, ScheduleSlot[]>,
  options: ScheduleExportOptions,
): ScheduleExportPayload => {
  const {
    dayStart,
    dayEnd,
    stepMinutes,
    trackLabels = {},
    trackOrder,
  } = options;
  const trackIds = trackOrder ?? (Object.keys(tracks) as TrackId[]);

  return {
    generatedAt: new Date().toISOString(),
    dayStartMinutes: dayStart,
    dayEndMinutes: dayEnd,
    stepMinutes,
    tracks: trackIds.map((trackId) => {
      const slots = [...(tracks[trackId] ?? [])].sort(
        (first, second) => first.start - second.start,
      );

      return {
        id: trackId,
        label: trackLabels[trackId],
        slots: slots.map((slot) => ({ ...slot })),
      };
    }),
  };
};
