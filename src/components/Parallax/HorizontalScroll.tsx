import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!slider.current) return;

      let panels = gsap.utils.toArray<HTMLElement>(".panel", slider.current);
      if (panels.length === 0) return;

      ScrollTrigger.create({
        trigger: slider.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + slider.current!.offsetWidth,
        onUpdate: (self) => {
          // Animate panels
          gsap.to(panels, {
            xPercent: -100 * (panels.length - 1) * self.progress,
            ease: "none",
          });

          // Animate parallax layers inside the current active panel
          panels.forEach((panel) => {
            const parallaxLayers =
              panel.querySelectorAll<HTMLElement>(".parallax-layer");
            parallaxLayers.forEach((layer) => {
              const speed = parseFloat(layer.dataset.speed || "0");
              // We adjust the movement based on the main scroll progress
              gsap.to(layer, {
                x: self.progress * 100 * -speed + "vw",
                ease: "none",
              });
            });
          });
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={component}>
      <div ref={slider} className={className}>
        {children}
      </div>
    </div>
  );
};

export default HorizontalScroll;
