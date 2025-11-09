import React, { useState } from "react";
import FireParticles from "../Others/FireParticles";
import Icon from "../Icon/Icon";
import Torch from "../Torch/Torch";
import CornerFlourish from "../CornerFlourish/CornerFlourish";

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
      <CornerFlourish position="top-left" />
      <CornerFlourish position="top-right" />

      {isHovered && <FireParticles />}
      <h3 className="ticket-name">{ticket.name}</h3>
      <div
        className="ticket-image"
        style={{ backgroundImage: `url(${ticket.image})` }}
      >
        <img src={ticket.image} alt={ticket.name} />
      </div>
      <div className="ticket-content">
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
