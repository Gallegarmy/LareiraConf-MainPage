import { useCallback, useEffect, useRef, useState } from "react";
import type { TeamMember } from "../team-types";

const MOBILE_BREAKPOINT = "(max-width: 640px)";
const INTERSECTION_THRESHOLDS = [0.45, 0.6, 0.75];

export type UseTeamCarouselReturn = {
  activeMemberId: string | null;
  isMobileView: boolean;
  registerCard: (memberId: string) => (node: HTMLElement | null) => void;
  activateMember: (memberId: string) => void;
  deactivateMember: (memberId: string) => void;
  toggleMember: (memberId: string) => void;
  scrollToMember: (memberId: string) => void;
};

export const useTeamCarousel = (
  members: TeamMember[],
): UseTeamCarouselReturn => {
  const [activeMemberId, setActiveMemberId] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobileView(event.matches);
    };

    setIsMobileView(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (!isMobileView || typeof window === "undefined") {
      observerRef.current?.disconnect();
      observerRef.current = null;
      setActiveMemberId(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length === 0) {
          return;
        }

        const memberId =
          visibleEntries[0].target.getAttribute("data-member-id");
        if (memberId) {
          setActiveMemberId((prev) => (prev === memberId ? prev : memberId));
        }
      },
      { threshold: INTERSECTION_THRESHOLDS },
    );

    observerRef.current = observer;

    cardRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [isMobileView]);

  useEffect(() => {
    if (isMobileView && members.length > 0) {
      setActiveMemberId((prev) => prev ?? members[0].id);
    }
  }, [isMobileView, members]);

  const registerCard = useCallback(
    (memberId: string) => (node: HTMLElement | null) => {
      const refs = cardRefs.current;
      const previousNode = refs.get(memberId);

      if (observerRef.current && previousNode) {
        observerRef.current.unobserve(previousNode);
      }

      if (!node) {
        refs.delete(memberId);
        return;
      }

      refs.set(memberId, node);
      if (observerRef.current) {
        observerRef.current.observe(node);
      }
    },
    [],
  );

  const activateMember = useCallback((memberId: string) => {
    setActiveMemberId(memberId);
  }, []);

  const deactivateMember = useCallback((memberId: string) => {
    setActiveMemberId((prev) => (prev === memberId ? null : prev));
  }, []);

  const toggleMember = useCallback((memberId: string) => {
    setActiveMemberId((prev) => (prev === memberId ? null : memberId));
  }, []);

  const scrollToMember = useCallback((memberId: string) => {
    const node = cardRefs.current.get(memberId);
    if (!node) {
      return;
    }

    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, []);

  return {
    activeMemberId,
    isMobileView,
    registerCard,
    activateMember,
    deactivateMember,
    toggleMember,
    scrollToMember,
  };
};
