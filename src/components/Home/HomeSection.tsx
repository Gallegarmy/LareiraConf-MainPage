import React from "react";
import "@styles/home.css";
import Calendar from "@img/icons/calendar.svg?react";
import Location from "@img/icons/location.svg?react";

const HomeSection = () => {
  return (
    <div className="panel home-section">
      <div className="content">
        <div className="home-info">
          <h2 className="element">
            <Calendar className="icon" />
            <span>20.03.26</span>
          </h2>
          <h2 className="element">
            <Location className="icon" />
            <span>A Coruña</span>
          </h2>
        </div>
        <h1 className="logo">Lareira Conf '26</h1>
      </div>
    </div>
  );
};

export default HomeSection;
