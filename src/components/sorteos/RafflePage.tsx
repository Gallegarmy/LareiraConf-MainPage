import React from "react";
import RaffleForm from "./RaffleForm";
import "./RafflePage.scss";
import torchImg from "../../img/assets/torch.png";

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
}

const RAFFLE_CONFIGS: Record<string, RaffleConfig> = {
  nerdearla: {
    id: "nerdearla",
    name: "Nerdearla — LareiraConf'26",
    description:
      "Hola nerd 🖖. Si has llegado hasta aquí, es porque eres de los que no se pierden un buen evento. Así que te lanzamos una misión: enciende tu cerilla y entra en el sorteo para venir a la LareiraConf. No hay coches (aun), pero sí mar, buena compañía y comida gallega 😋🔥",
    isActive: true,
    drawDate: "15 de noviembre de 2026",
    prize: "1 entrada gratuita para LareiraConf'26",
    matchHeadColor: "#ea3368",
  },
};

const RafflePage: React.FC = () => {
  const config = RAFFLE_CONFIGS.nerdearla;

  return (
    <div className="raffle-page" data-background="custom">
      <div className="raffle-page__wrapper">
        <div className="raffle-page__title-plate">
          <div className="title-torch title-torch--left">
            <img
              src={torchImg.src}
              alt="Antorcha"
              className="torch-image torch-image--lit"
            />
          </div>

          <h1>{config.name}</h1>

          <div className="title-torch title-torch--right">
            <img
              src={torchImg.src}
              alt="Antorcha"
              className="torch-image torch-image--lit"
            />
          </div>
        </div>

        <div className="raffle-page__container">
          <RaffleForm
            description={config.description}
            onSubmit={async (data) => {
              const res = await fetch("/api/raffle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: data.name,
                  email: data.email,
                  acceptTerms: data.acceptTerms,
                }),
              });
              if (!res.ok) {
                if (res.status === 409) {
                  throw new Error("Este email ya está registrado");
                }
                const text = await res.text();
                throw new Error(text || "Error al registrar");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RafflePage;
