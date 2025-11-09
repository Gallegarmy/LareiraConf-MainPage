import React from "react";
import ParallaxLayer from "../Parallax/ParallaxLayer";
import tickets from "../../data/tickets.json";
import TicketCard from "./TicketCard";
import "./TicketsSection.scss";

import mountainsImg from "@img/parallax/mountains.png";
import treesImg from "@img/parallax/trees.png";

const TicketsSection = () => {
  return (
    <section id="tickets" className="tickets-section panel">
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <ParallaxLayer speed={0} className="parallax-layer bg-layer">
          <div
            style={{
              background:
                "radial-gradient(ellipse at bottom, #35231b 0%, #0f0b09 100%)",
              width: "100%",
              height: "100%",
            }}
          />
        </ParallaxLayer>
        {/* <ParallaxLayer speed={-0.2} className="parallax-layer mountains-layer">
          <img
            src={mountainsImg.src}
            alt="mountains"
            className="parallax-img"
          />
        </ParallaxLayer>
        <ParallaxLayer speed={-0.5} className="parallax-layer trees-layer">
          <img src={treesImg.src} alt="trees" className="parallax-img" />
        </ParallaxLayer> */}

        <ParallaxLayer speed={0} className="content-layer">
          <div className="tickets-container">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </ParallaxLayer>
      </div>
    </section>
  );
};

export default TicketsSection;
