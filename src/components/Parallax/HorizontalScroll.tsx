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

        const heroPanel = panels[0] ?? null;
        const heroElements = heroPanel
          ? {
              gradient: heroPanel.querySelector<HTMLElement>(".home-gradient"),
              primary: heroPanel.querySelector<HTMLElement>(".home-primary"),
              secondary:
                heroPanel.querySelector<HTMLElement>(".home-secondary"),
              contentWrapper:
                heroPanel.querySelector<HTMLElement>(".home-content"),
              character: heroPanel.querySelector<HTMLElement>(
                ".evil-character-img",
              ),
            }
          : null;

        gsap.set(slider.current, { x: 0 });

        const step = 1 / (panels.length - 1);
        const clampIndex = gsap.utils.clamp(0, panels.length - 1);
        const clamp01 = gsap.utils.clamp(0, 1);
        const heroSegment = clamp01(Math.min(step * 1.7, 0.6));

        const mapScrollToSliderProgress = (progress: number) => {
          if (progress <= heroSegment) {
            return 0;
          }

          const remaining = 1 - heroSegment;
          if (remaining <= 0) {
            return 1;
          }

          return clamp01((progress - heroSegment) / remaining);
        };

        const mapSliderToScrollProgress = (sliderProgress: number) => {
          if (sliderProgress <= 0) {
            return 0;
          }

          const clampedSlider = clamp01(sliderProgress);
          return clamp01(heroSegment + (1 - heroSegment) * clampedSlider);
        };

        const getMaxTranslate = () => {
          if (!slider.current) return 0;
          return slider.current.scrollWidth - window.innerWidth;
        };

        const horizontalTween = gsap.to(slider.current, {
          x: () => -getMaxTranslate(),
          ease: "none",
          paused: true,
        });

        const heroEase = gsap.parseEase("power2.inOut");
        const animateHero = (overallProgress: number) => {
          if (!heroElements) {
            return;
          }

          const heroProgress =
            heroSegment <= 0 ? 1 : clamp01(overallProgress / heroSegment);
          const eased = heroEase(heroProgress);

          if (heroElements.gradient) {
            const fadeProgress = Math.min(1, eased * 1.35);
            const opacity = gsap.utils.interpolate(1, 0, fadeProgress);
            gsap.set(heroElements.gradient, {
              autoAlpha: opacity,
            });
          }

          if (heroElements.contentWrapper) {
            gsap.set(heroElements.contentWrapper, {
              xPercent: -105 * eased,
              yPercent: -7 * eased,
            });
          }

          if (heroElements.primary) {
            const primaryOffset = gsap.utils.interpolate(0, -115, eased);
            gsap.set(heroElements.primary, {
              xPercent: primaryOffset,
              autoAlpha: gsap.utils.interpolate(1, 0.24, eased),
              pointerEvents: eased >= 0.98 ? "none" : "auto",
              attr: { "aria-hidden": eased >= 0.95 ? "true" : "false" },
            });
          }

          if (heroElements.secondary) {
            const secondaryPos = gsap.utils.interpolate(110, -12, eased);
            const secondaryAlpha = eased >= 0.24 ? eased : 0;
            gsap.set(heroElements.secondary, {
              xPercent: secondaryPos,
              autoAlpha: secondaryAlpha,
              pointerEvents: eased >= 0.52 ? "auto" : "none",
              attr: { "aria-hidden": eased >= 0.3 ? "false" : "true" },
            });
          }

          if (heroElements.character) {
            gsap.set(heroElements.character, {
              xPercent: -64 * eased,
              autoAlpha: gsap.utils.interpolate(1, 0, eased * 1.05),
            });
          }
        };

        const refreshParallax = (sliderProgress: number) => {
          parallaxSets.forEach(({ layers }) => {
            layers.forEach((layer) => {
              const speed = parseFloat(layer.dataset.speed || "0");
              const normalizedProgress =
                layer.dataset.centered === "true"
                  ? Math.sin(sliderProgress * Math.PI) *
                    (2 * sliderProgress - 1)
                  : sliderProgress;

              gsap.set(layer, {
                xPercent: -100 * speed * normalizedProgress,
              });
            });
          });
        };

        const snapToPanel = (value: number) => {
          const sliderValue = mapScrollToSliderProgress(value);
          const currentProgress = horizontalTween.progress();
          const currentIndex = clampIndex(Math.round(currentProgress / step));
          const targetIndex = clampIndex(Math.round(sliderValue / step));

          if (Math.abs(targetIndex - currentIndex) <= 1) {
            return mapSliderToScrollProgress(targetIndex * step);
          }

          const direction = targetIndex > currentIndex ? 1 : -1;
          const nextIndex = clampIndex(currentIndex + direction);
          return mapSliderToScrollProgress(nextIndex * step);
        };

        const heroSnapThreshold = Math.max(heroSegment - 0.02, 0);

        animateHero(0);

        const trigger = ScrollTrigger.create({
          trigger: slider.current,
          start: "top top",
          pin: true,
          scrub: 1,
          end: () => "+=" + getMaxTranslate(),
          snap: {
            snapTo: (value) =>
              value < heroSnapThreshold ? value : snapToPanel(value),
            duration: { min: 0.3, max: 0.6 },
            delay: 0.05,
            ease: "power1.inOut",
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const sliderProgress = mapScrollToSliderProgress(self.progress);
            horizontalTween.progress(sliderProgress);
            refreshParallax(sliderProgress);
            animateHero(self.progress);
          },
        });

        const initialSliderProgress = mapScrollToSliderProgress(
          trigger.progress,
        );
        horizontalTween.progress(initialSliderProgress);
        refreshParallax(initialSliderProgress);
        animateHero(trigger.progress);

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

          const sliderTarget = desiredIndex * step;
          const targetProgress = mapSliderToScrollProgress(sliderTarget);
          const distance = trigger.end - trigger.start;
          if (distance <= 0) return;
          const targetScroll = trigger.start + targetProgress * distance;

          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        };

        window.horizontalPanelNav = { goToPanel };

        const handleRefresh = () => {
          const sliderProgress = mapScrollToSliderProgress(trigger.progress);
          horizontalTween.progress(sliderProgress);
          refreshParallax(sliderProgress);
          animateHero(trigger.progress);
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
