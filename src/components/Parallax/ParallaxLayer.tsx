import React from "react";

interface ParallaxLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed: number;
  className?: string;
  isCentered?: boolean;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed,
  className,
  isCentered = false,
  ...rest
}) => {
  const classes = ["parallax-layer", className].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      data-speed={speed}
      data-centered={isCentered ? "true" : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ParallaxLayer;
