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
        <p className="tickets-note">
          *Los precios no incluyen IVA ni gastos de gestión. Son costes externos
          que no van a las arcas de la Lareira. Los quitaríamos si pudiéramos,
          pero no queremos ir presos.
        </p>
      </div>
    </section>
  );
};

export default TicketsSection;
