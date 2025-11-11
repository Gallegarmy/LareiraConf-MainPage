import React from "react";
import "./Torch.scss";

interface TorchProps {
  size?: number;
  position: "left" | "right";
}

const Torch: React.FC<TorchProps> = ({ size = 150, position }) => {
  const style = {
    width: `${size}px`,
    height: "auto",
  };

  return (
    <div className={`torch-container ${position}`} style={style}>
      <img src="/assets/torch.png" alt="Antorcha" className="torch" />
      <div className="halo" />
    </div>
  );
};

export default Torch;
