import React, { useEffect, useRef, useState } from "react";
import FireParticles from "../Others/FireParticles";
import Icon from "../Icon/Icon";
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

const TOTAL_PRICE_WITH_FEES: Record<string, number> = {
  anventurero: 37.29,
  guerrero: 80.67,
  paladin: 122.86,
};

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const hasDiscount =
    typeof ticket.price.discounted === "number" &&
    ticket.price.discounted < ticket.price.original;

  const discountedPrice =
    typeof ticket.price.discounted === "number"
      ? ticket.price.discounted
      : ticket.price.original;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const formatBasePrice = (value: number) => formatCurrency(value);
  const formatPriceDetail = (value: number) => `${formatCurrency(value)}`;

  const totalPriceWithFees = TOTAL_PRICE_WITH_FEES[ticket.id];

  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !cardRef.current) {
      return;
    }

    const element = cardRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHovered(entry.isIntersecting);
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [isMobile]);

  const handleBuyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ticket.available) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const w = window.open(
      "https://widget.weezevent.com/ticket/E1414831/?code=39358&locale=es-ES&width_auto=1&color_primary=ff6900",
      "Venta de entradas Lareira Conf",
      "width=650, height=600, top=100, left=100, toolbar=no, resizable=yes, scrollbars=yes, status=no",
    );
    if (w) {
      w.focus();
    }
  };

  return (
    <div
      ref={cardRef}
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
            {hasDiscount ? (
              <>
                <span className="original-price">
                  {formatPriceDetail(ticket.price.original)}
                </span>
                <span className="discounted-price">
                  {formatBasePrice(discountedPrice)}
                </span>
              </>
            ) : (
              <span className="current-price">
                {formatBasePrice(ticket.price.original)}
              </span>
            )}
            {typeof totalPriceWithFees === "number" && (
              <span className="total-price">
                Total (IVA incluido): {formatCurrency(totalPriceWithFees)}
              </span>
            )}
          </div>
          <a
            href="https://widget.weezevent.com/ticket/E1414831/?code=39358&locale=es-ES&width_auto=1&color_primary=ff6900"
            onClick={handleBuyClick}
            className={`buy-button ${!ticket.available ? "disabled" : ""}`}
            aria-disabled={!ticket.available}
          >
            <Coin className="coin-icon" />
            {ticket.available ? "Comprar" : "Agotado"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
