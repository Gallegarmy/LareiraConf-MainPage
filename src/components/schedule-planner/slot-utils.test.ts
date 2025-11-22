import { describe, expect, it, vi } from "vitest";
import {
  MIN_SLOT_DURATION,
  normalizeSlots,
  updateSlotCollection,
  createScheduleExport,
} from "./slot-utils";
import type { ScheduleSlot } from "./slot-utils";

const TOTAL_MINUTES = 11 * 60;

const createSlot = (overrides: Partial<ScheduleSlot>): ScheduleSlot => ({
  id: `slot-${Math.random().toString(36).slice(2, 8)}`,
  title: overrides.title ?? "Test slot",
  category: overrides.category ?? "talk",
  start: overrides.start ?? 0,
  duration: overrides.duration ?? 30,
});

describe("normalizeSlots", () => {
  it("pushes subsequent slots to prevent overlap", () => {
    const slots: ScheduleSlot[] = [
      createSlot({ id: "a", start: 0, duration: 40 }),
      createSlot({ id: "b", start: 35, duration: 30 }),
      createSlot({ id: "c", start: 70, duration: 25 }),
    ];

    const normalized = normalizeSlots(slots, TOTAL_MINUTES, MIN_SLOT_DURATION);

    expect(normalized[0]).toMatchObject({ start: 0, duration: 40 });
    expect(normalized[1].start).toBe(40);
    expect(normalized[1].duration).toBeGreaterThanOrEqual(MIN_SLOT_DURATION);
    expect(normalized[2].start).toBeGreaterThanOrEqual(
      normalized[1].start + normalized[1].duration,
    );
  });

  it("keeps slots within the day limits", () => {
    const slots: ScheduleSlot[] = [
      createSlot({ id: "a", start: TOTAL_MINUTES - 10, duration: 30 }),
    ];

    const [normalized] = normalizeSlots(
      slots,
      TOTAL_MINUTES,
      MIN_SLOT_DURATION,
    );

    expect(normalized.start + normalized.duration).toBeLessThanOrEqual(
      TOTAL_MINUTES,
    );
    expect(normalized.duration).toBeGreaterThanOrEqual(MIN_SLOT_DURATION);
  });
});

describe("updateSlotCollection", () => {
  it("applies start changes and keeps ordering", () => {
    const slots: ScheduleSlot[] = [
      createSlot({ id: "a", start: 60, duration: 30 }),
      createSlot({ id: "b", start: 120, duration: 30 }),
    ];

    const updated = updateSlotCollection(
      slots,
      "a",
      TOTAL_MINUTES,
      MIN_SLOT_DURATION,
      { start: 150 },
    );

    expect(updated[0].id).toBe("b");
    expect(updated[1].id).toBe("a");
    expect(updated[1].start).toBeGreaterThanOrEqual(
      updated[0].start + updated[0].duration,
    );
  });
});

describe("createScheduleExport", () => {
  it("builds a payload with metadata and copies", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-02T12:00:00Z"));

    const tracks: Record<"auditorium" | "exterior", ScheduleSlot[]> = {
      auditorium: [
        {
          id: "a",
          title: "Slot A",
          category: "talk",
          start: 0,
          duration: 30,
        },
      ],
      exterior: [
        {
          id: "b",
          title: "Slot B",
          category: "party",
          start: 60,
          duration: 45,
        },
      ],
    };

    const payload = createScheduleExport(tracks, {
      dayStart: 540,
      dayEnd: 1260,
      stepMinutes: 5,
      trackLabels: { auditorium: "Auditorio", exterior: "Exterior" },
      trackOrder: ["auditorium", "exterior"],
    });

    expect(payload.generatedAt).toBe("2025-01-02T12:00:00.000Z");
    expect(payload.dayStartMinutes).toBe(540);
    expect(payload.dayEndMinutes).toBe(1260);
    expect(payload.stepMinutes).toBe(5);
    expect(payload.tracks).toHaveLength(2);
    expect(payload.tracks[0]).toMatchObject({
      id: "auditorium",
      label: "Auditorio",
      slots: [
        {
          id: "a",
          title: "Slot A",
          category: "talk",
          start: 0,
          duration: 30,
        },
      ],
    });
    expect(payload.tracks[1].id).toBe("exterior");
    expect(payload.tracks[1].slots[0]).not.toBe(tracks.exterior[0]);

    vi.useRealTimers();
  });
});
