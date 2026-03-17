import integraLogo from "@img/collaborators/integra-iria.png";
import adanLogo from "@img/collaborators/adan.svg";
import malteLogo from "@img/collaborators/malte.svg";
import udcLogo from "@img/collaborators/udc.svg";
import grupoBillinghamLogo from "@img/collaborators/grupo-billingham.svg";
import freakGzmLogo from "@img/collaborators/freak-gzm.svg";
import nessLogo from "@img/collaborators/ness.png";
import adrianLogo from "@img/collaborators/adrian.png";
import sirviendoCodigoLogo from "@img/collaborators/sirviendo-codigo.svg";
import weartocodeLogo from "@img/collaborators/weartocode.svg";
import didixitalLogo from "@img/collaborators/didixital.png";

export interface Collaborator {
  id: string;
  name: string;
  url: string;
  logo: string;
  alt: string;
  logoScale?: number;
}

// Para sustituir un logo placeholder por el real:
// 1. Pon el archivo en src/img/collaborators/
// 2. Actualiza el import correspondiente arriba

export const collaborators: Collaborator[] = [
  {
    id: "integra",
    name: "Integra",
    url: "https://integrairiacasteleiro.es/",
    logo: integraLogo.src,
    alt: "Logo de Integra",
  },
  {
    id: "adan",
    name: "Adan",
    url: "mailto:javiayude@gmail.com",
    logo: adanLogo.src,
    alt: "Logo de Adan",
  },
  {
    id: "malte",
    name: "Malte",
    url: "https://www.somosmalte.com/",
    logo: malteLogo.src,
    alt: "Logo de Malte",
  },
  {
    id: "udc",
    name: "UDC",
    url: "https://udc.es",
    logo: udcLogo.src,
    alt: "Logo de UDC",
  },
  {
    id: "grupo-billingham",
    name: "Grupo Billingham",
    url: "https://grupobillingham.com",
    logo: grupoBillinghamLogo.src,
    alt: "Logo de Grupo Billingham",
  },
  {
    id: "freak-gzm",
    name: "Freak GZM",
    url: "https://www.instagram.com/freak_gzm/",
    logo: freakGzmLogo.src,
    alt: "Logo de Freak GZM",
    logoScale: 0.85,
  },
  {
    id: "ness",
    name: "Ness",
    url: "https://nessyanez.com/",
    logo: nessLogo.src,
    alt: "Logo de Ness",
  },
  {
    id: "adrian",
    name: "Adrián Lado",
    url: "https://adrianlado.es/",
    logo: adrianLogo.src,
    alt: "Logo de Adrián Lado",
  },
  {
    id: "sirviendo-codigo",
    name: "Sirviendo código",
    url: "https://sirviendocodigo.com",
    logo: sirviendoCodigoLogo.src,
    alt: "Logo de Sirviendo código",
    logoScale: 1.2,
  },
  {
    id: "weartocode",
    name: "WearToCode",
    url: "https://weartocode.myspreadshop.es/",
    logo: weartocodeLogo.src,
    alt: "Logo de WearToCode",
    logoScale: 1.4,
  },
  {
    id: "didixital",
    name: "Didixital",
    url: "https://www.impresiondidixital.es/",
    logo: didixitalLogo.src,
    alt: "Logo de Didixital",
    logoScale: 0.8,
  },
];
