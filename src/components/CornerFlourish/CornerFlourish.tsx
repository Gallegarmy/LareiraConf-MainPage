import React from "react";
import "./CornerFlourish.scss";
import FlourishIcon from "../../img/assets/flourish.svg?react";

interface CornerFlourishProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const CornerFlourish: React.FC<CornerFlourishProps> = ({ position }) => {
  return (
    <div className={`corner-flourish ${position}`}>
      <FlourishIcon />
    </div>
  );
};

export default CornerFlourish;
