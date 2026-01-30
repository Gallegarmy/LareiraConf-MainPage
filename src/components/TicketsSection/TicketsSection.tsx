import React from "react";
import tickets from "../../data/tickets.json";
import TicketCard from "./TicketCard";
import "./TicketsSection.scss";
import { useTranslations } from "@/i18n/utils";

import Torch from "@components/Torch/Torch";

interface TicketsSectionProps {
  lang: string;
}

const TicketsSection: React.FC<TicketsSectionProps> = ({ lang }) => {
  const t = useTranslations(lang as "es" | "gl");

  return (
    <section id="tickets" className="tickets-section panel">
      <div className="tickets-background" />
      <div className="tickets-content">
        <div className="section-description">
          <Torch position="left" size={100} />
          <Torch position="right" size={100} />
          <p>{t("tickets.description.intro")}</p>
          <p>{t("tickets.description.cta")}</p>
        </div>
        <div className="tickets-container">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TicketsSection;
