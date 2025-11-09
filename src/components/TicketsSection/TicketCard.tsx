import React, { useState } from "react";
import FireParticles from "../Others/FireParticles";
import Icon from "../Icon/Icon";
import Torch from "../Torch/Torch";

import Coin from "@img/icons/coin.svg?react";

interface Ticket {
  id: string;
  name: string;
  description: string;
  image: string;
  price: {
    original: number;
    discounted: number | null;
  };
  perks: {
    name: string;
    included: boolean;
  }[];
  available: boolean;
}

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`ticket-card ${!ticket.available ? "disabled" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Torch position="left" size={100} />
      <Torch position="right" size={100} />

      {isHovered && <FireParticles />}
      <div className="ticket-image">
        <img src={ticket.image} alt={ticket.name} />
      </div>
      <div className="ticket-content">
        <h3>{ticket.name}</h3>
        <p className="ticket-description">{ticket.description}</p>
        <ul className="ticket-perks">
          {ticket.perks.map((perk) => (
            <li key={perk.name} className={perk.included ? "included" : ""}>
              <Icon name={perk.included ? "check" : "x"} />
              <span>{perk.name}</span>
            </li>
          ))}
        </ul>
        <div className="separator" />
        <div className="buy-content">
          <div className="ticket-price">
            {ticket.price.discounted ? (
              <>
                <span className="original-price">{ticket.price.original}€</span>
                <span className="discounted-price">
                  {ticket.price.discounted}€
                </span>
              </>
            ) : (
              <span className="current-price">${ticket.price.original}</span>
            )}
          </div>
          <button className="buy-button" disabled={!ticket.available}>
            <Coin className="coin-icon" />
            {ticket.available ? "Comprar" : "Agotado"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
