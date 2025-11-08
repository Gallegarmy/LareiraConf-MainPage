import React from "react";
import HorizontalScroll from "./HorizontalScroll";
import ParallaxLayer from "./ParallaxLayer";

const ParallaxDemo = () => {
  return (
    <HorizontalScroll className="container">
      <div className="panel panel-1">
        <ParallaxLayer speed={-2} className="bg-layer">
          <h2 style={{ opacity: 0.3, transform: "translateX(-50%)" }}>
            Fondo Lento
          </h2>
        </ParallaxLayer>
        <ParallaxLayer speed={0} className="content-layer">
          <h1>Sección 1</h1>
        </ParallaxLayer>
        <ParallaxLayer speed={1} className="details-layer">
          <h3 style={{ fontSize: "2rem", transform: "translateX(50%)" }}>
            Detalle Rápido
          </h3>
        </ParallaxLayer>
      </div>
      <div className="panel panel-2">
        <h1>Sección 2</h1>
      </div>
      <div className="panel panel-3">
        <h1>Sección 3</h1>
      </div>
    </HorizontalScroll>
  );
};

export default ParallaxDemo;
