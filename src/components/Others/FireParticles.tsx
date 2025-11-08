import React from "react";
import "@styles/particles.css";

const FireParticles = ({ count = 50 }) => {
  const particles = Array.from({ length: count }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 5 + 2}px`,
      height: `${Math.random() * 5 + 2}px`,
      animationDuration: `${Math.random() * 5 + 5}s`,
      animationDelay: `${Math.random() * 5}s`,
    };
    return <div key={i} className="particle" style={style} />;
  });

  return <div className="particle-container">{particles}</div>;
};

export default FireParticles;
