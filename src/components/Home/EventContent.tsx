import React from "react";
import Calendar from "@img/icons/calendar.svg?react";
import Location from "@img/icons/location.svg?react";

const EventContent = () => {
  return (
    <div className="content">
      <div className="home-info">
        <h2 className="element">
          <Calendar className="icon" />
          <span>20 y 21 de Marzo</span>
        </h2>
        <h2 className="element">
          <Location className="icon" />
          <span>A Coruña</span>
        </h2>
      </div>
      <h1 className="logo">Lareira Conf '26</h1>
      <div className="subtitle">
        <p>El encuentro tech que enciende ideas y conecta comunidades</p>
      </div>
    </div>
  );
};

export default EventContent;
