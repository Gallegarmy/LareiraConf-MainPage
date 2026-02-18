// Importar logos
import dinahostingLogo from "@img/sponsors/dinahosting.svg";
import raiolaLogo from "@img/sponsors/raiola.svg";
import denodoLogo from "@img/sponsors/denodo.svg";
import wordpressLogo from "@img/sponsors/wordpress.svg";
import docutenLogo from "@img/sponsors/docuten.svg";
import nextdigitalLogo from "@img/sponsors/nextdigital.svg";
import gradiantLogo from "@img/sponsors/gradiant.svg";
import teimasLogo from "@img/sponsors/teimas.svg";
import captologyLogo from "@img/sponsors/captology.svg";
import keleaLogo from "@img/sponsors/kelea.svg";
import nttdataLogo from "@img/sponsors/nttdata.svg";
import accentureLogo from "@img/sponsors/accenture.svg";

// Importar personajes
import granMaestroH from "@img/sponsors/gran-maestro-h.png";
import granMaestroM from "@img/sponsors/gran-maestro-m.png";
import artesanoH from "@img/sponsors/artesano-h.png";
import artesanoM from "@img/sponsors/artesano-m.png";
import oficialH from "@img/sponsors/oficial-h.png";
import oficialM from "@img/sponsors/oficial-m.png";

// Importar tenderetes
import tendretePeq from "@img/sponsors/tenderete-peq.png";
import tendereteG from "@img/sponsors/tenderete-g.png";
import tendereteM1 from "@img/sponsors/tenderete-m1.png";
import tendereteM2 from "@img/sponsors/tenderete-m2.png";
import tendereteM3 from "@img/sponsors/tenderete-m3.png";
import tendereteM4 from "@img/sponsors/tenderete-m4.png";
import tendereteM5 from "@img/sponsors/tenderete-m5.png";

// Importar cartel
import cartelImage from "@img/sponsors/cartel.png";

export type SponsorTier =
  | "gran-maestro"
  | "maestro-artesano"
  | "oficial-artesano";
export type CharacterSide = "left" | "right" | "center";
export type CharacterType = "H" | "M";

export interface CharacterVariation {
  rotate: number;
  scale: number;
  flip: boolean;
}

export interface SponsorConfig {
  name: string;
  tier: SponsorTier;
  logo: string | null;
  url?: string;
  customText?: string;
  customImage?: string;

  // Configuración de tenderete
  tenderete: string;

  // Configuración de personaje
  character: {
    type: CharacterType;
    side: CharacterSide;
    variation: CharacterVariation;
  } | null;

  // Para Gran Maestro (dos personajes)
  charactersGranMaestro?: {
    left: string;
    right: string;
  };
}

// Tenderetes disponibles
export const tenderetes = {
  grande: tendereteG.src,
  pequeno: tendretePeq.src,
  maestro1: tendereteM1.src,
  maestro2: tendereteM2.src,
  maestro3: tendereteM3.src,
  maestro4: tendereteM4.src,
  maestro5: tendereteM5.src,
};

// Personajes disponibles
export const characters = {
  granMaestroH: granMaestroH.src,
  granMaestroM: granMaestroM.src,
  artesanoH: artesanoH.src,
  artesanoM: artesanoM.src,
  oficialH: oficialH.src,
  oficialM: oficialM.src,
};

// Configuración completa de sponsors
export const sponsorsConfig: SponsorConfig[] = [
  // Gran Maestro
  {
    name: "Dinahosting",
    tier: "gran-maestro",
    logo: dinahostingLogo.src,
    url: "https://dinahosting.com",
    tenderete: tenderetes.grande,
    character: null,
    charactersGranMaestro: {
      left: characters.granMaestroM,
      right: characters.granMaestroH,
    },
  },

  // Maestros Artesanos
  {
    name: "NextDigital",
    tier: "maestro-artesano",
    logo: nextdigitalLogo.src,
    url: "https://nextdigital.es",
    tenderete: tenderetes.maestro1,
    character: {
      type: "H",
      side: "left",
      variation: { rotate: 2, scale: 1.0, flip: false },
    },
  },
  {
    name: "NTT DATA",
    tier: "maestro-artesano",
    logo: nttdataLogo.src,
    url: "https://es.nttdata.com/",
    tenderete: tenderetes.maestro2,
    character: {
      type: "M",
      side: "left",
      variation: { rotate: -1, scale: 1.0, flip: true },
    },
  },
  {
    name: "?",
    tier: "maestro-artesano",
    logo: null,
    url: "https://lareiraconfsponsordeck.my.canva.site/",
    customText: "Monta tu puesto aquí",
    customImage: cartelImage.src,
    tenderete: tenderetes.maestro3,
    character: null,
  },
  {
    name: "Accenture",
    tier: "maestro-artesano",
    logo: accentureLogo.src,
    url: "https://www.accenture.com",
    tenderete: tenderetes.maestro4,
    character: {
      type: "M",
      side: "left",
      variation: { rotate: -1, scale: 1.0, flip: false },
    },
  },
  {
    name: "WordPress.com",
    tier: "maestro-artesano",
    logo: wordpressLogo.src,
    url: "https://wordpress.com/es/academia/",
    tenderete: tenderetes.maestro5,
    character: {
      type: "H",
      side: "left",
      variation: { rotate: 3, scale: 1.0, flip: true },
    },
  },
  {
    name: "Raiola",
    tier: "maestro-artesano",
    logo: raiolaLogo.src,
    url: "https://raiolanetworks.es",
    tenderete: tenderetes.maestro3, // Override: usa tenderete 3
    character: {
      type: "H",
      side: "left",
      variation: { rotate: -1, scale: 1, flip: false },
    },
  },
  {
    name: "Denodo",
    tier: "maestro-artesano",
    logo: denodoLogo.src,
    url: "https://www.denodo.com",
    tenderete: tenderetes.maestro1, // Override: usa tenderete 1
    character: {
      type: "M",
      side: "left",
      variation: { rotate: 2, scale: 1, flip: true },
    },
  },
  {
    name: "Docuten",
    tier: "maestro-artesano",
    logo: docutenLogo.src,
    url: "https://www.docuten.com",
    tenderete: tenderetes.maestro2,
    character: {
      type: "H",
      side: "left",
      variation: { rotate: -2, scale: 1, flip: false },
    },
  },
  {
    name: "Gradiant",
    tier: "maestro-artesano",
    logo: gradiantLogo.src,
    url: "https://www.gradiant.org",
    tenderete: tenderetes.maestro4,
    character: {
      type: "M",
      side: "left",
      variation: { rotate: 1, scale: 1, flip: true },
    },
  },
  // Oficiales Artesanos
  {
    name: "Captology",
    tier: "oficial-artesano",
    logo: captologyLogo.src,
    url: "https://captology.es",
    tenderete: tenderetes.pequeno,
    character: {
      type: "H",
      side: "center",
      variation: { rotate: 0, scale: 1, flip: false },
    },
  },
  {
    name: "Teimas",
    tier: "oficial-artesano",
    logo: teimasLogo.src,
    url: "https://www.teimas.com",
    tenderete: tenderetes.pequeno,
    character: {
      type: "M",
      side: "center",
      variation: { rotate: 0, scale: 1, flip: true },
    },
  },
  {
    name: "Kelea",
    tier: "oficial-artesano",
    logo: keleaLogo.src,
    url: "https://kelea.es",
    tenderete: tenderetes.pequeno,
    character: {
      type: "H",
      side: "center",
      variation: { rotate: 0, scale: 1, flip: false },
    },
  },
  {
    name: "Pétalo",
    tier: "oficial-artesano",
    logo: null,
    url: "#",
    tenderete: tenderetes.pequeno,
    character: {
      type: "H",
      side: "center",
      variation: { rotate: 0, scale: 1, flip: false },
    },
  },
];

// Organizar sponsors por tier para facilitar el renderizado
export const sponsorsByTier = {
  granMaestro: sponsorsConfig.filter((s) => s.tier === "gran-maestro")[0],
  maestrosArtesanos: sponsorsConfig.filter(
    (s) => s.tier === "maestro-artesano",
  ),
  oficialesArtesanos: sponsorsConfig.filter(
    (s) => s.tier === "oficial-artesano",
  ),
};

// Función helper para obtener el src del personaje según tipo
export function getCharacterSrc(
  type: CharacterType,
  tier: SponsorTier,
): string {
  if (tier === "maestro-artesano") {
    return type === "H" ? characters.artesanoH : characters.artesanoM;
  } else if (tier === "oficial-artesano") {
    return type === "H" ? characters.oficialH : characters.oficialM;
  }
  return characters.artesanoH; // fallback
}
