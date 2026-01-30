import React, { useState, useEffect } from "react";
import "@styles/fireflies.css";

type FireflyParticlesProps = {
  count?: number;
};

const FireflyParticles = React.memo(({ count = 50 }: FireflyParticlesProps) => {
  const [fireflies, setFireflies] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newFireflies = Array.from({ length: count }).map((_, i) => {
      const size = `${Math.random() * 2 + 1}px`;
      const colors = ["#FFD700", "#FFA500", "#90EE90", "#ADFF2F"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const endX = Math.random() * 100;
      const endY = Math.random() * 100;

      const style: React.CSSProperties = {
        left: `${startX}%`,
        top: `${startY}%`,
        width: size,
        height: size,
        backgroundColor: color,
        color: color,
        animationDuration: `${Math.random() * 8 + 12}s, ${Math.random() * 2 + 1.5}s`,
        animationDelay: `${Math.random() * 10}s, ${Math.random() * 2}s`,
        // @ts-ignore
        "--end-x": `${endX}%`,
        "--end-y": `${endY}%`,
      };

      return <div key={i} className="firefly" style={style} />;
    });

    setFireflies(newFireflies);
  }, [count]);

  return <div className="firefly-container">{fireflies}</div>;
});

export default FireflyParticles;
