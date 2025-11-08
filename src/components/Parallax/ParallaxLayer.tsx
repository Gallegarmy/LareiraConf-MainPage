import React from "react";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed: number;
  className?: string;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed,
  className,
}) => {
  return (
    <div
      className={`parallax-layer ${className || ""}`}
      data-speed={speed}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxLayer;
