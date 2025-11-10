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
    <div className={`parallax-layer ${className || ""}`} data-speed={speed}>
      {children}
    </div>
  );
};

export default ParallaxLayer;
