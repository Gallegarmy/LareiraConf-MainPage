import React, { useMemo } from "react";
import "@styles/particles.css";

type FireParticlesProps = {
  count?: number;
};

const FireParticles = React.memo(({ count = 50 }: FireParticlesProps) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = `${Math.random() * 5 + 2}px`;
      const colors = ["var(--accent)", "var(--color-5)"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const style: React.CSSProperties = {
        left: `${Math.random() * 100}%`,
        width: size,
        height: size,
        backgroundColor: color,
        animationDuration: `${Math.random() * 5 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
      };

      return <div key={i} className="particle" style={style} />;
    });
  }, [count]);

  return <div className="particle-container">{particles}</div>;
});

export default FireParticles;
