import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import styles from "./schedule-planner.module.css";
import {
  BASE_SCHEDULE,
  CATEGORY_METADATA,
  CATEGORY_OPTIONS,
  DAY_END_MINUTES,
  DAY_START_MINUTES,
  LEGEND_CATEGORIES,
  PIXELS_PER_MINUTE,
  TOTAL_MINUTES,
  TRACKS,
  TRACK_LABELS,
} from "./schedule-config";
import {
  MIN_SLOT_DURATION,
  STEP_MINUTES,
  clamp,
  formatDuration,
  formatTime,
  insertSlot,
  normalizeSlots,
  snapToStep,
  updateSlotCollection,
  removeSlot,
  createScheduleExport,
} from "./slot-utils";
import type { ScheduleSlot, SlotCategory, TrackId } from "./slot-utils";

type InteractionType = "move" | "resize-start" | "resize-end";

interface PointerInteraction {
  slotId: string;
  trackId: TrackId;
  type: InteractionType;
  originY: number;
  initialSlot: ScheduleSlot;
}

const generateId = () => `slot-${Math.random().toString(36).slice(2, 10)}`;

const buildInitialTracks = (): Record<TrackId, ScheduleSlot[]> => {
  const grouped = TRACKS.reduce(
    (acc, trackId) => {
      acc[trackId] = [] as ScheduleSlot[];
      return acc;
    },
    {} as Record<TrackId, ScheduleSlot[]>,
  );

  BASE_SCHEDULE.forEach(({ track, ...slot }) => {
    grouped[track].push({ ...slot });
  });

  return TRACKS.reduce(
    (acc, trackId) => {
      acc[trackId] = normalizeSlots(
        grouped[trackId],
        TOTAL_MINUTES,
        MIN_SLOT_DURATION,
      );
      return acc;
    },
    {} as Record<TrackId, ScheduleSlot[]>,
  );
};

const formatTimeRange = (slot: ScheduleSlot) =>
  `${formatTime(DAY_START_MINUTES, slot.start)} – ${formatTime(
    DAY_START_MINUTES,
    slot.start + slot.duration,
  )}`;

const getDurationLabel = (slot: ScheduleSlot) => formatDuration(slot.duration);

const PlannerLegend = ({ categories }: { categories: SlotCategory[] }) => (
  <div className={styles.legend}>
    {categories.map((category) => {
      const metadata = CATEGORY_METADATA[category];
      if (!metadata) {
        return null;
      }

      return (
        <span key={category} className={styles.legendItem}>
          <span
            className={styles.legendSwatch}
            style={{ background: metadata.gradient }}
          />
          {metadata.label}
        </span>
      );
    })}
  </div>
);

const totalHeight = TOTAL_MINUTES * PIXELS_PER_MINUTE;

const SchedulePlanner = () => {
  const [tracks, setTracks] = useState<Record<TrackId, ScheduleSlot[]>>(() =>
    buildInitialTracks(),
  );
  const [editingSlot, setEditingSlot] = useState<{
    trackId: TrackId;
    slotId: string;
    title: string;
    category: SlotCategory;
  } | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const tracksRef = useRef(tracks);
  const interactionRef = useRef<PointerInteraction | null>(null);
  const feedbackTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current !== null) {
        window.clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  const onPointerMove = useCallback((event: PointerEvent) => {
    const interaction = interactionRef.current;
    if (!interaction) {
      return;
    }

    const deltaPixels = event.clientY - interaction.originY;
    const deltaMinutesRaw = deltaPixels / PIXELS_PER_MINUTE;

    if (interaction.type === "move") {
      const proposedStart = clamp(
        snapToStep(interaction.initialSlot.start + deltaMinutesRaw),
        0,
        TOTAL_MINUTES - MIN_SLOT_DURATION,
      );

      setTracks((current) => ({
        ...current,
        [interaction.trackId]: updateSlotCollection(
          current[interaction.trackId],
          interaction.slotId,
          TOTAL_MINUTES,
          MIN_SLOT_DURATION,
          { start: proposedStart },
        ),
      }));

      return;
    }

    if (interaction.type === "resize-start") {
      const bottom =
        interaction.initialSlot.start + interaction.initialSlot.duration;
      const proposedStart = clamp(
        snapToStep(interaction.initialSlot.start + deltaMinutesRaw),
        0,
        bottom - MIN_SLOT_DURATION,
      );
      const newDuration = clamp(
        bottom - proposedStart,
        MIN_SLOT_DURATION,
        TOTAL_MINUTES - proposedStart,
      );

      setTracks((current) => ({
        ...current,
        [interaction.trackId]: updateSlotCollection(
          current[interaction.trackId],
          interaction.slotId,
          TOTAL_MINUTES,
          MIN_SLOT_DURATION,
          { start: proposedStart, duration: newDuration },
        ),
      }));

      return;
    }

    if (interaction.type === "resize-end") {
      const bottom =
        interaction.initialSlot.start + interaction.initialSlot.duration;
      const proposedBottom = clamp(
        snapToStep(bottom + deltaMinutesRaw),
        interaction.initialSlot.start + MIN_SLOT_DURATION,
        TOTAL_MINUTES,
      );
      const newDuration = clamp(
        proposedBottom - interaction.initialSlot.start,
        MIN_SLOT_DURATION,
        TOTAL_MINUTES - interaction.initialSlot.start,
      );

      setTracks((current) => ({
        ...current,
        [interaction.trackId]: updateSlotCollection(
          current[interaction.trackId],
          interaction.slotId,
          TOTAL_MINUTES,
          MIN_SLOT_DURATION,
          { duration: newDuration },
        ),
      }));
    }
  }, []);

  const stopPointerTracking = useCallback(() => {
    interactionRef.current = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", stopPointerTracking);
    window.removeEventListener("pointercancel", stopPointerTracking);
  }, [onPointerMove]);

  useEffect(() => {
    return () => {
      stopPointerTracking();
    };
  }, [stopPointerTracking]);

  const beginInteraction = useCallback(
    (
      event: ReactPointerEvent<HTMLElement>,
      trackId: TrackId,
      slotId: string,
      type: InteractionType,
    ) => {
      event.preventDefault();
      event.stopPropagation();

      const slot = tracksRef.current[trackId].find(
        (item) => item.id === slotId,
      );
      if (!slot) {
        return;
      }

      interactionRef.current = {
        slotId,
        trackId,
        type,
        originY: event.clientY,
        initialSlot: slot,
      };

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", stopPointerTracking);
      window.addEventListener("pointercancel", stopPointerTracking);
    },
    [onPointerMove, stopPointerTracking],
  );

  const openSlotEditor = useCallback((trackId: TrackId, slot: ScheduleSlot) => {
    setEditingSlot({
      trackId,
      slotId: slot.id,
      title: slot.title,
      category: slot.category,
    });
  }, []);

  const updateEditingField = useCallback(
    (field: "title" | "category", value: string) => {
      setEditingSlot((current) => {
        if (!current) {
          return current;
        }
        if (field === "category") {
          return {
            ...current,
            category: value as SlotCategory,
          };
        }
        return {
          ...current,
          [field]: value,
        };
      });
    },
    [],
  );

  const closeSlotEditor = useCallback(() => {
    setEditingSlot(null);
  }, []);

  const saveSlotEdits = useCallback(() => {
    if (!editingSlot) {
      return;
    }

    const { trackId, slotId, title, category } = editingSlot;
    const trimmedTitle = title.trim() || "Sin título";

    setTracks((current) => ({
      ...current,
      [trackId]: updateSlotCollection(
        current[trackId],
        slotId,
        TOTAL_MINUTES,
        MIN_SLOT_DURATION,
        { title: trimmedTitle, category },
      ),
    }));

    closeSlotEditor();
  }, [closeSlotEditor, editingSlot]);

  const deleteSlot = useCallback((trackId: TrackId, slotId: string) => {
    setTracks((current) => ({
      ...current,
      [trackId]: removeSlot(current[trackId], slotId),
    }));
    setEditingSlot((current) => {
      if (current && current.trackId === trackId && current.slotId === slotId) {
        return null;
      }
      return current;
    });
  }, []);

  const updateSlotByKeyboard = useCallback(
    (
      event: KeyboardEvent<HTMLElement>,
      trackId: TrackId,
      slot: ScheduleSlot,
    ) => {
      const { key } = event;
      if (key !== "ArrowUp" && key !== "ArrowDown") {
        return;
      }

      event.preventDefault();
      const delta = key === "ArrowUp" ? -STEP_MINUTES : STEP_MINUTES;
      const proposedStart = clamp(
        snapToStep(slot.start + delta),
        0,
        TOTAL_MINUTES - slot.duration,
      );

      setTracks((current) => ({
        ...current,
        [trackId]: updateSlotCollection(
          current[trackId],
          slot.id,
          TOTAL_MINUTES,
          MIN_SLOT_DURATION,
          { start: proposedStart },
        ),
      }));
    },
    [],
  );

  const addSlot = useCallback((trackId: TrackId) => {
    setTracks((current) => {
      const currentSlots = current[trackId];
      const lastSlot = currentSlots[currentSlots.length - 1];
      const startCandidate = lastSlot
        ? lastSlot.start + lastSlot.duration + STEP_MINUTES
        : 0;
      const normalizedStart = clamp(
        snapToStep(startCandidate),
        0,
        TOTAL_MINUTES - MIN_SLOT_DURATION,
      );
      const defaultDuration = 30;
      const slot: ScheduleSlot = {
        id: generateId(),
        title: "Nuevo slot",
        category: "announcement",
        start: normalizedStart,
        duration: clamp(
          snapToStep(defaultDuration),
          MIN_SLOT_DURATION,
          TOTAL_MINUTES - normalizedStart,
        ),
      };

      return {
        ...current,
        [trackId]: insertSlot(
          currentSlots,
          slot,
          TOTAL_MINUTES,
          MIN_SLOT_DURATION,
        ),
      };
    });
  }, []);

  const copyConfiguration = useCallback(async () => {
    if (typeof window === "undefined") {
      return;
    }

    const payload = createScheduleExport(tracksRef.current, {
      dayStart: DAY_START_MINUTES,
      dayEnd: DAY_END_MINUTES,
      stepMinutes: STEP_MINUTES,
      trackLabels: TRACK_LABELS,
      trackOrder: TRACKS,
    });

    const json = JSON.stringify(payload, null, 2);

    const handleFeedback = (message: string) => {
      setCopyFeedback(message);
      if (feedbackTimeoutRef.current !== null) {
        window.clearTimeout(feedbackTimeoutRef.current);
      }
      feedbackTimeoutRef.current = window.setTimeout(() => {
        setCopyFeedback(null);
        feedbackTimeoutRef.current = null;
      }, 2400);
    };

    const fallbackCopy = () => {
      if (typeof document === "undefined") {
        throw new Error("Document is not available");
      }
      const textArea = document.createElement("textarea");
      textArea.value = json;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "absolute";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    };

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(json);
      } else {
        fallbackCopy();
      }
      handleFeedback("Configuración copiada");
    } catch (error) {
      try {
        fallbackCopy();
        handleFeedback("Configuración copiada");
      } catch (fallbackError) {
        console.error("No se pudo copiar la configuración", fallbackError);
        handleFeedback("No se pudo copiar la configuración");
      }
    }
  }, []);

  const timeMarks = useMemo(() => {
    const marks: Array<{ label: string; offset: number }> = [];
    for (let minutes = 0; minutes <= TOTAL_MINUTES; minutes += 60) {
      marks.push({
        label: formatTime(DAY_START_MINUTES, minutes),
        offset: minutes,
      });
    }
    return marks;
  }, []);

  return (
    <section className={styles.planner} aria-label="Planificador de escaleta">
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Planifica tu escaleta</h1>
          <p className={styles.subtitle}>
            Arrastra, redimensiona y reordena cada slot. Ambos tracks comparten
            horario inicial y final.
          </p>
        </div>
        <div className={styles.headerActions}>
          <PlannerLegend categories={LEGEND_CATEGORIES} />
          <button
            type="button"
            className={styles.downloadButton}
            onClick={copyConfiguration}
          >
            Copiar config
          </button>
          <span
            className={styles.copyFeedback}
            role="status"
            aria-live="polite"
          >
            {copyFeedback}
          </span>
        </div>
      </header>

      <div className={styles.timelineWrapper}>
        <div
          className={styles.timeScale}
          style={
            {
              height: `${totalHeight}px`,
              "--timeline-height": `${totalHeight}px`,
            } as CSSProperties
          }
        >
          {timeMarks.map((mark) => (
            <div
              key={mark.label}
              className={styles.timeMark}
              style={{ top: `${(mark.offset / TOTAL_MINUTES) * 100}%` }}
              aria-hidden="true"
            >
              <span className={styles.timeLabel}>{mark.label}</span>
              <span className={styles.timeLine} />
            </div>
          ))}
        </div>

        {TRACKS.map((trackId) => (
          <div key={trackId} className={styles.track}>
            <div className={styles.trackHeader}>
              <span className={styles.trackTitle}>{TRACK_LABELS[trackId]}</span>
              <button
                type="button"
                className={styles.addButton}
                onClick={() => addSlot(trackId)}
              >
                Añadir slot
              </button>
            </div>

            <div
              className={styles.trackBody}
              style={
                {
                  height: `${totalHeight}px`,
                  "--grid-step": `${PIXELS_PER_MINUTE * 60}px`,
                } as CSSProperties
              }
            >
              {tracks[trackId].map((slot) => {
                const top = slot.start * PIXELS_PER_MINUTE;
                const height = slot.duration * PIXELS_PER_MINUTE;
                const metadata = CATEGORY_METADATA[slot.category];
                const categoryLabel = metadata?.label ?? slot.category;
                const isEditing =
                  editingSlot?.slotId === slot.id &&
                  editingSlot.trackId === trackId;
                const slotClassNames = [
                  styles.slot,
                  metadata?.className ?? styles.slotAnnouncement,
                ];
                if (!isEditing && height <= PIXELS_PER_MINUTE * 15) {
                  slotClassNames.push(styles.slotCompact);
                }
                const slotClass = slotClassNames.join(" ");
                return (
                  <article
                    key={slot.id}
                    className={slotClass}
                    style={
                      {
                        top: `${top}px`,
                        height: `${height}px`,
                        "--slot-height": `${height}px`,
                      } as CSSProperties
                    }
                    role="button"
                    tabIndex={0}
                    aria-label={`${slot.title}. ${categoryLabel}. ${formatTimeRange(slot)}. Duración ${getDurationLabel(slot)}`}
                    onPointerDown={
                      isEditing
                        ? undefined
                        : (event) =>
                            beginInteraction(event, trackId, slot.id, "move")
                    }
                    onKeyDown={
                      isEditing
                        ? undefined
                        : (event) => updateSlotByKeyboard(event, trackId, slot)
                    }
                  >
                    {!isEditing && (
                      <div
                        className={`${styles.resizeHandle} ${styles.resizeTop}`}
                        role="presentation"
                        onPointerDown={(event) =>
                          beginInteraction(
                            event,
                            trackId,
                            slot.id,
                            "resize-start",
                          )
                        }
                      />
                    )}
                    {isEditing ? (
                      <div className={styles.editForm}>
                        <div className={styles.formRow}>
                          <label
                            className={styles.formLabel}
                            htmlFor={`slot-title-${slot.id}`}
                          >
                            Título
                          </label>
                          <input
                            id={`slot-title-${slot.id}`}
                            className={styles.formInput}
                            value={editingSlot.title}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              updateEditingField("title", event.target.value)
                            }
                          />
                        </div>
                        <div className={styles.formRow}>
                          <label
                            className={styles.formLabel}
                            htmlFor={`slot-category-${slot.id}`}
                          >
                            Tipo de actividad
                          </label>
                          <select
                            id={`slot-category-${slot.id}`}
                            className={styles.formSelect}
                            value={editingSlot.category}
                            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                              updateEditingField("category", event.target.value)
                            }
                          >
                            {CATEGORY_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className={styles.formActions}>
                          <button
                            type="button"
                            className={`${styles.formButton} ${styles.formButtonSave}`}
                            onClick={saveSlotEdits}
                          >
                            Guardar
                          </button>
                          <button
                            type="button"
                            className={`${styles.formButton} ${styles.formButtonCancel}`}
                            onClick={closeSlotEditor}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={styles.slotControls}>
                          <button
                            type="button"
                            className={styles.controlButton}
                            aria-label="Editar slot"
                            title="Editar slot"
                            onClick={() => openSlotEditor(trackId, slot)}
                            onPointerDown={(event) => event.stopPropagation()}
                          >
                            <svg
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path d="M13.586 3.586a2 2 0 0 1 2.828 2.828l-8.22 8.22-3.248.541.541-3.248zM11.5 5.672l-8.22 8.22a1 1 0 0 0-.262.508l-.59 3.546a.5.5 0 0 0 .58.58l3.546-.59a1 1 0 0 0 .508-.262l8.22-8.22z" />
                            </svg>
                            <span className={styles.visuallyHidden}>
                              Editar
                            </span>
                          </button>
                          <button
                            type="button"
                            className={`${styles.controlButton} ${styles.controlButtonDelete}`}
                            aria-label="Eliminar slot"
                            title="Eliminar slot"
                            onClick={() => deleteSlot(trackId, slot.id)}
                            onPointerDown={(event) => event.stopPropagation()}
                          >
                            <svg
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path d="M7 2h6l.5 1H17v2h-1v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5H3V3h3.5zm7 3H6v11a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1zM8 7h1v9H8zm3 0h1v9h-1z" />
                            </svg>
                            <span className={styles.visuallyHidden}>
                              Eliminar
                            </span>
                          </button>
                        </div>
                        <div className={styles.slotInfo}>
                          <div className={styles.slotTitle}>{slot.title}</div>
                          <div className={styles.slotMeta}>
                            <span className={styles.slotTime}>
                              {formatTimeRange(slot)}
                            </span>
                            <span className={styles.slotDuration}>
                              {getDurationLabel(slot)}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`${styles.resizeHandle} ${styles.resizeBottom}`}
                          role="presentation"
                          onPointerDown={(event) =>
                            beginInteraction(
                              event,
                              trackId,
                              slot.id,
                              "resize-end",
                            )
                          }
                        />
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SchedulePlanner;
