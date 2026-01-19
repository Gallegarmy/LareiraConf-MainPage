import { useCallback, useEffect, useMemo, useState } from "react";
import type { Speaker } from "../speakers-types";

const MOBILE_BREAKPOINT = "(max-width: 768px)";

export type UseSpeakersBookReturn = {
  spreads: Speaker[][];
  currentSpreadIndex: number;
  totalSpreads: number;
  isMobileView: boolean;
  canGoToPrevious: boolean;
  canGoToNext: boolean;
  goToSpread: (index: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
};

export const useSpeakersBook = (speakers: Speaker[]): UseSpeakersBookReturn => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobileView(event.matches);
    };

    handleChange(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const spreads = useMemo(() => {
    const chunkSize = isMobileView ? 1 : 2;
    if (chunkSize <= 0) {
      return [];
    }

    const chunks: Speaker[][] = [];

    for (let index = 0; index < speakers.length; index += chunkSize) {
      chunks.push(speakers.slice(index, index + chunkSize));
    }

    return chunks;
  }, [speakers, isMobileView]);

  useEffect(() => {
    setCurrentSpreadIndex((previous) => {
      if (spreads.length === 0) {
        return 0;
      }

      if (previous >= spreads.length) {
        return spreads.length - 1;
      }

      return previous;
    });
  }, [spreads.length]);

  const goToSpread = useCallback(
    (index: number) => {
      setCurrentSpreadIndex((previous) => {
        if (spreads.length === 0) {
          return 0;
        }

        if (Number.isNaN(index)) {
          return previous;
        }

        const clamped = Math.max(0, Math.min(index, spreads.length - 1));
        return clamped;
      });
    },
    [spreads.length],
  );

  const goToPrevious = useCallback(() => {
    setCurrentSpreadIndex((previous) => Math.max(previous - 1, 0));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentSpreadIndex((previous) => {
      if (spreads.length === 0) {
        return 0;
      }
      return Math.min(previous + 1, spreads.length - 1);
    });
  }, [spreads.length]);

  const canGoToPrevious = currentSpreadIndex > 0;
  const canGoToNext =
    spreads.length > 0 && currentSpreadIndex < spreads.length - 1;

  return {
    spreads,
    currentSpreadIndex,
    totalSpreads: spreads.length,
    isMobileView,
    canGoToPrevious,
    canGoToNext,
    goToSpread,
    goToPrevious,
    goToNext,
  };
};
