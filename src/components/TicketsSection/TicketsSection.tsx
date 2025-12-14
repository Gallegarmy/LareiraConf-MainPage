import React from "react";
import tickets from "../../data/tickets.json";
import TicketCard from "./TicketCard";
import "./TicketsSection.scss";

import Torch from "@components/Torch/Torch";

const TicketsSection = () => {
  return (
    <section id="tickets" className="tickets-section panel">
      <div className="tickets-background" />
      <div className="tickets-content">
        <div className="section-description">
          <Torch position="left" size={100} />
          <Torch position="right" size={100} />
          <p>
            Alguien robó el fuego de la Lareira, y solo Lumi sobrevive entre las
            sombras.
          </p>
          <p>
            Elige tu personaje y preparate para formar tu equipo, ganar
            conocimientos, resolver acertijos y vivir la aventura de reavivar la
            Lareira.
          </p>
        </div>
        <div className="tickets-container">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TicketsSection;
