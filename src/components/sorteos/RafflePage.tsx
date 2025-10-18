import React, { useEffect, useState } from "react";
import RaffleForm from "./RaffleForm";
import "./RafflePage.scss";

/**
 * Configuración de sorteos (estática).
 * Param: ?evento=trg
 */
interface RaffleConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  drawDate: string;
  prize: string;
  matchHeadColor: string;
  logo: string;
}

const RAFFLE_CONFIGS: Record<string, RaffleConfig> = {
  trg: {
    id: "trg",
    name: "TRGx — LareiraConf'26",
    description:
      "Hola tarugo o taruga 👋 Si has llegado hasta aquí, es porque eres de los que no se pierden una buena evento. Así que te lanzamos una misión: enciende tu cerilla y entra en el sorteo para venir a la LareiraConf. No hay recreativas (aun), pero sí mar, buena compañía y comida gallega 😋🔥",
    isActive: true,
    drawDate: "15 de mayo de 2026",
    prize: "1 entrada gratuita para LareiraConf'26",
    matchHeadColor: "#ea3368",
    logo: "/src/img/assets/ticket.webp",
  },
};

const RafflePage: React.FC = () => {
  const [eventId, setEventId] = useState<string | null>(null);
  const [config, setConfig] = useState<RaffleConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener parámetro evento
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const evt = params.get("evento");
    setEventId(evt);
  }, []);

  useEffect(() => {
    if (eventId && RAFFLE_CONFIGS[eventId]) {
      setConfig(RAFFLE_CONFIGS[eventId]);
    }
    setIsLoading(false);
  }, [eventId]);

  if (isLoading) {
    return (
      <div className="raffle-page">
        <div className="raffle-page__container">
          <div style={{ textAlign: "center", padding: "4rem", color: "white" }}>
            <p>Cargando sorteo...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="raffle-page">
        <div className="raffle-page__container">
          <div
            style={{ textAlign: "center", padding: "4rem", color: "orange" }}
          >
            <p>Sorteo no encontrado.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="raffle-page" data-background="custom">
      <div className="raffle-page__wrapper">
        <div className="raffle-page__title-plate">
          <div className="title-torch title-torch--left">
            <img
              src="/src/img/assets/torch.png"
              alt="Antorcha"
              className="torch-image torch-image--lit"
            />
          </div>

          <h1>{config.name}</h1>

          <div className="title-torch title-torch--right">
            <img
              src="/src/img/assets/torch.png"
              alt="Antorcha"
              className="torch-image torch-image--lit"
            />
          </div>
        </div>

        <div className="raffle-page__container">
          <RaffleForm
            description={config.description}
            onSubmit={async () => {
              /* stub submit */
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RafflePage;
