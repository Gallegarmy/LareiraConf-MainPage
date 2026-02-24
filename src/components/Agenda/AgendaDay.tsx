import React from "react";
import papiroHorizontal from "@img/assets/pergamino_horizontal.png";
import papiroSinFondo from "@img/assets/pergamino.png";

interface AgendaDayProps {
  date: string;
  subtitle: string;
  isOpen: boolean;
  isClosing: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AgendaDay: React.FC<AgendaDayProps> = ({
  date,
  subtitle,
  isOpen,
  isClosing,
  onToggle,
  children,
}) => {
  const classNames = [
    "agenda-scroll-day",
    isOpen ? "agenda-scroll-day--open" : "",
    isClosing ? "agenda-scroll-day--closing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames}>
      <button
        className="agenda-day__header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <img
          src={papiroHorizontal.src}
          alt=""
          className="agenda-day__header-img"
          aria-hidden="true"
        />
        <div className="agenda-day__header-content">
          <span className="agenda-day__date">{date}</span>
          <span className="agenda-day__subtitle">{subtitle}</span>
        </div>
      </button>

      <div
        className="agenda-day__body"
        style={{ backgroundImage: `url(${papiroSinFondo.src})` }}
      >
        <div className="agenda-papyrus">
          <ul className="agenda-slots">{children}</ul>
        </div>
      </div>

      <div className="agenda-day__footer" aria-hidden="true">
        <img
          src={papiroHorizontal.src}
          alt=""
          className="agenda-day__footer-img"
        />
      </div>
    </div>
  );
};

export default AgendaDay;
