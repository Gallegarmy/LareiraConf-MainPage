import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";

type ScrollTriggerModule = typeof import("gsap/ScrollTrigger");
let ScrollTriggerPlugin: ScrollTriggerModule["ScrollTrigger"] | null = null;

const ensureScrollTrigger = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  if (!ScrollTriggerPlugin) {
    const module = await import("gsap/ScrollTrigger");
    ScrollTriggerPlugin = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTriggerPlugin);
  }

  return ScrollTriggerPlugin;
};

declare global {
  interface Window {
    horizontalPanelNav?: {
      goToPanel: (panel: number | string) => void;
    } | null;
  }
}

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  className,
}) => {
  const component = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      window.horizontalPanelNav = null;
      return undefined;
    }

    if (isMobile) {
      window.horizontalPanelNav = null;
      return undefined;
    }

    let teardown: (() => void) | undefined;
    let cancelled = false;

    const setup = async () => {
      const ScrollTrigger = await ensureScrollTrigger();
      if (!ScrollTrigger || cancelled) {
        return;
      }

      const ctx = gsap.context(() => {
        window.horizontalPanelNav = null;
        if (!slider.current) return;

        const panels = gsap.utils.toArray<HTMLElement>(
          ".panel",
          slider.current,
        );
        if (panels.length <= 1) return;

        const parallaxSets = panels.map((panel) => {
          const layers = Array.from(
            panel.querySelectorAll<HTMLElement>(".parallax-layer"),
          );
          return { panel, layers };
        });

        gsap.set(slider.current, { x: 0 });

        const step = 1 / (panels.length - 1);
        const clampIndex = gsap.utils.clamp(0, panels.length - 1);

        const getMaxTranslate = () => {
          if (!slider.current) return 0;
          return slider.current.scrollWidth - window.innerWidth;
        };

        const horizontalTween = gsap.to(slider.current, {
          x: () => -getMaxTranslate(),
          ease: "none",
          paused: true,
        });

        const snapToPanel = (value: number) => {
          const currentProgress = horizontalTween.progress();
          const currentIndex = clampIndex(Math.round(currentProgress / step));
          const targetIndex = clampIndex(Math.round(value / step));

          if (Math.abs(targetIndex - currentIndex) <= 1) {
            return targetIndex * step;
          }

          const direction = targetIndex > currentIndex ? 1 : -1;
          const nextIndex = clampIndex(currentIndex + direction);
          return nextIndex * step;
        };

        const refreshParallax = (progress: number) => {
          parallaxSets.forEach(({ layers }) => {
            layers.forEach((layer) => {
              const speed = parseFloat(layer.dataset.speed || "0");
              const normalizedProgress =
                layer.dataset.centered === "true"
                  ? Math.sin(progress * Math.PI) * (2 * progress - 1)
                  : progress;

              gsap.set(layer, {
                xPercent: -100 * speed * normalizedProgress,
              });
            });
          });
        };

        const trigger = ScrollTrigger.create({
          trigger: slider.current,
          start: "top top",
          pin: true,
          scrub: 1,
          end: () => "+=" + getMaxTranslate(),
          animation: horizontalTween,
          snap: {
            snapTo: snapToPanel,
            duration: { min: 0.3, max: 0.6 },
            delay: 0.05,
            ease: "power1.inOut",
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => refreshParallax(self.progress),
        });

        refreshParallax(trigger.progress);

        const goToPanel = (panelTarget: number | string) => {
          if (!slider.current) return;

          let desiredIndex: number | null = null;

          if (typeof panelTarget === "number") {
            desiredIndex = clampIndex(panelTarget);
          } else {
            const cleanId = panelTarget.replace(/^#/, "");
            const foundIndex = panels.findIndex(
              (panel) => panel.id === cleanId,
            );
            if (foundIndex !== -1) {
              desiredIndex = clampIndex(foundIndex);
            }
          }

          if (desiredIndex === null) return;

          const targetProgress = desiredIndex * step;
          const distance = trigger.end - trigger.start;
          if (distance <= 0) return;
          const targetScroll = trigger.start + targetProgress * distance;

          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        };

        window.horizontalPanelNav = { goToPanel };

        const handleRefresh = () => {
          refreshParallax(trigger.progress);
        };

        ScrollTrigger.addEventListener("refresh", handleRefresh);

        return () => {
          ScrollTrigger.removeEventListener("refresh", handleRefresh);
          trigger.kill();
          horizontalTween.kill();
          if (slider.current) {
            gsap.set(slider.current, { clearProps: "transform" });
          }
          window.horizontalPanelNav = null;
        };
      }, component);

      teardown = () => ctx.revert();
    };

    setup();

    return () => {
      cancelled = true;
      if (teardown) {
        teardown();
      }
    };
  }, [isMobile]);

  return (
    <div ref={component}>
      <div ref={slider} className={className}>
        {children}
      </div>
    </div>
  );
};

export default HorizontalScroll;
