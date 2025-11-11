import React from "react";
import "./Match.scss";

interface MatchProps {
  isLit: boolean;
  headColor?: string;
}

const Match: React.FC<MatchProps> = ({ isLit, headColor }) => {
  const matchStyle = headColor
    ? ({ "--match-head-color": headColor } as React.CSSProperties)
    : undefined;

  return (
    <div
      className={`match ${isLit ? "match--lit" : "match--unlit"}`}
      style={matchStyle}
    >
      <div className="match__stick" />
      <div className="match__head" />
      {isLit && (
        <div className="match__flame">
          <div className="match__flame-core" />
            <div className="match__flame-outer" />
        </div>
      )}
    </div>
  );
};

export default Match;
