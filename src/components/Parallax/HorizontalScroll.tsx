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

        // Panel combinado colaboradores+patrocinadores (índice 3, 0-indexed)
        const sponsorsIndex = 3;
        const sponsorsPanel = panels[sponsorsIndex] ?? null;
        const sponsorsElements = sponsorsPanel
          ? {
              sign: sponsorsPanel.querySelector<HTMLElement>(
                ".sponsors-section__sign",
              ),
              maestros: sponsorsPanel.querySelector<HTMLElement>(
                ".sponsors-grid__maestros",
              ),
              foreground: sponsorsPanel.querySelector<HTMLElement>(
                ".sponsors-grid__foreground",
              ),
              scrollTrack: sponsorsPanel.querySelector<HTMLElement>(
                ".sponsors-scroll-track",
              ),
              parallax:
                sponsorsPanel.querySelector<HTMLElement>(".sponsors-parallax"),
            }
          : null;

        gsap.set(slider.current, { x: 0 });

        const step = 1 / (panels.length - 1);
        const clampIndex = gsap.utils.clamp(0, panels.length - 1);
        const clamp01 = gsap.utils.clamp(0, 1);
        const heroSegment = clamp01(Math.min(step * 1.7, 0.6));

        // ── Hold del panel colaboradores+patrocinadores ────────────────────
        const sponsorsSliderProgress = sponsorsIndex * step;
        const sponsorsHoldDuration = clamp01(step * 1.5);
        // Calcula cuándo el slider alcanza el panel de sponsors tras el hero hold
        const availableSlider = 1 - heroSegment - sponsorsHoldDuration;
        const sponsorsScrollStart = clamp01(
          heroSegment + availableSlider * sponsorsSliderProgress,
        );
        const sponsorsScrollEnd = clamp01(
          sponsorsScrollStart + sponsorsHoldDuration,
        );
        // ──────────────────────────────────────────────────────────────────

        const mapScrollToSliderProgress = (progress: number) => {
          // Fase 1: hero hold — slider en 0
          if (progress <= heroSegment) return 0;

          // Fase 2: slider avanza de 0 → sponsorsSliderProgress
          if (progress <= sponsorsScrollStart) {
            const t =
              (progress - heroSegment) / (sponsorsScrollStart - heroSegment);
            return clamp01(t * sponsorsSliderProgress);
          }

          // Fase 3: sponsors hold — slider se queda en sponsorsSliderProgress
          if (progress <= sponsorsScrollEnd) return sponsorsSliderProgress;

          // Fase 4: slider avanza de sponsorsSliderProgress → 1
          const t = (progress - sponsorsScrollEnd) / (1 - sponsorsScrollEnd);
          return clamp01(
            sponsorsSliderProgress + t * (1 - sponsorsSliderProgress),
          );
        };

        const mapSliderToScrollProgress = (sliderProgress: number) => {
          if (sliderProgress <= 0) return 0;
          const clamped = clamp01(sliderProgress);

          if (clamped <= sponsorsSliderProgress) {
            const t = clamped / sponsorsSliderProgress;
            return clamp01(
              heroSegment + t * (sponsorsScrollStart - heroSegment),
            );
          }

          const t =
            (clamped - sponsorsSliderProgress) / (1 - sponsorsSliderProgress);
          return clamp01(sponsorsScrollEnd + t * (1 - sponsorsScrollEnd));
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

        // ── Animación interna: scroll vertical colaboradores → patrocinadores
        const scrollEase = gsap.parseEase("power2.inOut");
        const animateSponsors = (overallProgress: number) => {
          if (!sponsorsElements || sponsorsHoldDuration <= 0) return;

          const raw =
            (overallProgress - sponsorsScrollStart) / sponsorsHoldDuration;
          const p = clamp01(raw);

          // Track sube: muestra colaboradores (p=0) → patrocinadores (p=1)
          if (sponsorsElements.scrollTrack) {
            const sp = scrollEase(p);
            gsap.set(sponsorsElements.scrollTrack, {
              y: gsap.utils.interpolate(0, -window.innerHeight, sp),
            });
          }

          // Fondo sube más despacio → efecto parallax
          if (sponsorsElements.parallax) {
            const sp = scrollEase(p);
            gsap.set(sponsorsElements.parallax, {
              y: gsap.utils.interpolate(0, -window.innerHeight * 0.35, sp),
            });
          }
        };

        // Estado inicial: colaboradores visibles (track en y=0)
        if (sponsorsElements) {
          if (sponsorsElements.sign)
            gsap.set(sponsorsElements.sign, { y: 0, autoAlpha: 1 });
          if (sponsorsElements.maestros)
            gsap.set(sponsorsElements.maestros, { y: 0, autoAlpha: 1 });
          if (sponsorsElements.foreground)
            gsap.set(sponsorsElements.foreground, { y: 0, autoAlpha: 1 });
          if (sponsorsElements.scrollTrack)
            gsap.set(sponsorsElements.scrollTrack, { y: 0 });
          if (sponsorsElements.parallax)
            gsap.set(sponsorsElements.parallax, { y: 0 });
        }
        // ──────────────────────────────────────────────────────────────────

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
        const sponsorsSnapStart = Math.max(sponsorsScrollStart - 0.02, 0);
        const sponsorsSnapEnd = Math.min(sponsorsScrollEnd + 0.02, 1);

        animateHero(0);
        animateSponsors(0);

        const trigger = ScrollTrigger.create({
          trigger: slider.current,
          start: "top top",
          pin: true,
          scrub: 1,
          end: () => "+=" + getMaxTranslate(),
          snap: {
            snapTo: (value) => {
              if (value < heroSnapThreshold) return value;
              if (value > sponsorsSnapStart && value < sponsorsSnapEnd)
                return value;
              return snapToPanel(value);
            },
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
            animateSponsors(self.progress);
          },
        });

        const initialSliderProgress = mapScrollToSliderProgress(
          trigger.progress,
        );
        horizontalTween.progress(initialSliderProgress);
        refreshParallax(initialSliderProgress);
        animateHero(trigger.progress);
        animateSponsors(trigger.progress);

        const goToPanel = (panelTarget: number | string) => {
          if (!slider.current) return;

          let desiredIndex: number | null = null;

          if (typeof panelTarget === "number") {
            desiredIndex = clampIndex(panelTarget);
          } else {
            const cleanId = panelTarget.replace(/^#/, "");
            const foundIndex = panels.findIndex((panel) => {
              if (panel.id === cleanId) return true;
              const aliases =
                panel.getAttribute("data-nav-ids")?.split(" ") ?? [];
              return aliases.includes(cleanId);
            });
            if (foundIndex !== -1) {
              desiredIndex = clampIndex(foundIndex);
            }
          }

          if (desiredIndex === null) return;

          const distance = trigger.end - trigger.start;
          if (distance <= 0) return;

          // Si el destino es un alias del panel de sponsors (no su id primario),
          // navegar al final del hold para mostrar la página de patrocinadores
          let targetProgress: number;
          if (
            typeof panelTarget === "string" &&
            desiredIndex === sponsorsIndex &&
            panels[desiredIndex].id !== panelTarget.replace(/^#/, "")
          ) {
            targetProgress = sponsorsScrollEnd;
          } else {
            const sliderTarget = desiredIndex * step;
            targetProgress = mapSliderToScrollProgress(sliderTarget);
          }

          window.scrollTo({
            top: trigger.start + targetProgress * distance,
            behavior: "smooth",
          });
        };

        window.horizontalPanelNav = { goToPanel };

        const handleRefresh = () => {
          const sliderProgress = mapScrollToSliderProgress(trigger.progress);
          horizontalTween.progress(sliderProgress);
          refreshParallax(sliderProgress);
          animateHero(trigger.progress);
          animateSponsors(trigger.progress);
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
